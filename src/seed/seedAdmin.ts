import bcrypt from "bcryptjs";
import { UserRole } from "../middlewares/auth";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("12345", 8);
  console.log("seedAdmin");
  const adminData = {
    name: "admin",
    email: "admin@gmail.com",
    role: UserRole.admin,
    password: hashedPassword,
  };

  // 1.is Admin already exists!
  // 2.if Exists then return
  // 3.If not then create

  try {
    const isExists = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (isExists) {
      console.log("Admin Already Exists!");
      return;
    }

    const admin = await prisma.user.create({
      data: adminData,
    });

    console.log("Admin Created Successfully!!");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();
