// import { BookingStatus } from "../../../generated/prisma";
import { BookingStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";

// 1. Create Sitter Profile
const createSitterIntoDB = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Invalid user");

  const isExists = await prisma.sitterProfiles.findUnique({
    where: { sitterId: userId },
  });
  if (isExists) throw new Error("Sitter profile already exists");

  return await prisma.sitterProfiles.create({
    data: { ...payload, sitterId: user.id },
  });
};

// 2. Update Sitter Profile
const updateSitterProfileIntoDB = async (payload: any, userId: string) => {
  const profile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: userId },
  });
  if (!profile) throw new Error("Sitter profile not found");

  return await prisma.sitterProfiles.update({
    where: { sitterId: userId },
    data: payload,
  });
};

// 3. Get All Sitters (Public with Filters)
const getAllSittersFromDB = async () => {
  return await prisma.sitterProfiles.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      services: true,
      reviews: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// 4. Get Single Sitter by Profile ID (Public)
const getSingleSitterFromDB = async (sitterProfileId: string) => {
  const result = await prisma.sitterProfiles.findUnique({
    where: { id: sitterProfileId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      services: true,
      reviews: {
        include: {
          owner: { select: { id: true, name: true } },
        },
      },
    },
  });
  if (!result) throw new Error("Sitter profile not found");
  return result;
};

// 5. Update Booking Status (Sitter Accept/Decline/Complete)
const updateBookingStatusIntoDB = async (
  status: BookingStatus,
  bookingId: string
) => {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
};

export const SitterService = {
  createSitterIntoDB,
  updateSitterProfileIntoDB,
  getAllSittersFromDB,
  getSingleSitterFromDB,
  updateBookingStatusIntoDB,
};