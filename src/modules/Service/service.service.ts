import { prisma } from "../../lib/prisma";

const createServiceIntoDB = async (payload: any, userId: string) => {
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: userId },
  });

  if (!sitterProfile) {
    throw new Error("Sitter profile not found");
  }

  const result = await prisma.service.create({
    data: { ...payload, sitterId: sitterProfile.id },
  });

  return result;
};

const getAllServiceIntoDB = async () => {
  const result = await prisma.service.findMany({
    include: {
      sitter: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getSingleServiceIntoDB = async (serviceId: string) => {
  const result = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      sitter: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return result;
};

export const ServiceService = {
  createServiceIntoDB,
  getAllServiceIntoDB,
  getSingleServiceIntoDB,
};