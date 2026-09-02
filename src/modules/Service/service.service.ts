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

const updateServiceIntoDB = async (serviceId: string, userId: string, payload: any) => {
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: userId },
  });
  if (!sitterProfile) throw new Error("Sitter profile not found");

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service || service.sitterId !== sitterProfile.id) {
    throw new Error("You are not authorized to update this service");
  }

  return await prisma.service.update({
    where: { id: serviceId },
    data: payload,
  });
};

const deleteServiceFromDB = async (serviceId: string, userId: string) => {
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: userId },
  });
  if (!sitterProfile) throw new Error("Sitter profile not found");

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service || service.sitterId !== sitterProfile.id) {
    throw new Error("You are not authorized to delete this service");
  }

  return await prisma.service.delete({
    where: { id: serviceId },
  });
};

export const ServiceService = {
  createServiceIntoDB,
  getAllServiceIntoDB,
  getSingleServiceIntoDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};