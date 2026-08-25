import { Status } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const updateUserStatusInDB = async (userId: string, status: Status) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    include: {
      owner: { select: { id: true, name: true, email: true } },
      pet: true,
      service: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusInDB,
  getAllBookingsFromDB,
};