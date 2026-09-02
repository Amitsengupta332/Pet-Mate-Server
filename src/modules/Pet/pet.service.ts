import { prisma } from "../../lib/prisma";

const createPetIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("Invalid user");
  }

  const result = await prisma.pet.create({
    data: { ...payload, ownerId: userId },
  });
  return result;
};

const getAllPetIntoDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found!!");
  }

  const result = await prisma.pet.findMany({
    where: {
      ownerId: user.id,
    },
  });

  return result;
};

const getSinglePetIntoDB = async (petId: string) => {
  const result = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return result;
};


const updatePetIntoDB = async (
  petId: string,
  userId: string,
  payload: Partial<{ name: string; breed: string; age: string; notes: string }>
) => {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });

  if (!pet) {
    throw new Error("Pet not found!");
  }

  if (pet.ownerId !== userId) {
    throw new Error("You are not authorized to update this pet!");
  }

  const result = await prisma.pet.update({
    where: { id: petId },
    data: payload,
  });

  return result;
};

const deletePetFromDB = async (petId: string, userId: string) => {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });

  if (!pet) {
    throw new Error("Pet not found!");
  }

  if (pet.ownerId !== userId) {
    throw new Error("You are not authorized to delete this pet!");
  }

  const result = await prisma.pet.delete({
    where: { id: petId },
  });

  return result;
};

export const PetService = {
  createPetIntoDB,
  getAllPetIntoDB,
  getSinglePetIntoDB,
  updatePetIntoDB,
  deletePetFromDB,
};