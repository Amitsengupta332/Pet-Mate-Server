import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const secret = "jkjfkaaljfkaj";
const createUserIntoDB = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  const { password, ...newResult } = result;
  return newResult;
};
const loginUserIntoDB = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    status: user.status,
  };
  const token = jwt.sign(userData, secret, { expiresIn: "1d" });

  return {
    token,
    user
  }
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
};
