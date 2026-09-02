import { Booking } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createBookingIntoDB = async (
  payload: Omit<
    Booking,
    "id" | "createdAt" | "updatedAt" | "ownerId" | "totalPrice"
  >,
  userId: string,
) => {
  // 1. user exist
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. pet exist & belongs to owner
  const pet = await prisma.pet.findUnique({
    where: {
      id: payload.petId,
    },
  });

  if (!pet) {
    throw new Error("Pet not found");
  }

  if (pet.ownerId !== userId) {
    throw new Error("Pet does not belong to the user");
  }

  // 3. service exist
  const service = await prisma.service.findUnique({
    where: {
      id: payload.serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  // 4. Time Calculation
  const startTime = new Date(payload.startDate).getTime();
  const endTime = new Date(payload.endDate).getTime();

  if (endTime <= startTime) {
    throw new Error("End date must be greater than start date");
  }

  const duration = endTime - startTime;
  const durationInHour = duration / (1000 * 60 * 60);
  const totalPrice = durationInHour * service.price;

  // 5. Create Booking
  const result = await prisma.booking.create({
    data: {
      ...payload,
      ownerId: userId, // <-- Fix: ownerId যুক্ত করা হয়েছে
      totalPrice,
    },
  });

  return result;
};

// নিজের বুকিং লিস্ট পাওয়ার মেথড
const getUserBookingsFromDB = async (userId: string, role: string) => {
  let whereCondition = {};

  // ওনার হলে নিজের তৈরি বুকিং এবং সিটার হলে তার কাজের বুকিং ফিল্টার হবে
  if (role === "OWNER") {
    whereCondition = { ownerId: userId };
  } else if (role === "SITTER") {
    whereCondition = { sitterId: userId };
  }

  const result = await prisma.booking.findMany({
    where: whereCondition,
    include: {
      pet: true,
      service: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleBookingFromDB = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      pet: true,
      service: true,
      owner: { select: { id: true, name: true, email: true } },
    },
  });

  if (!booking) throw new Error("Booking not found");
  if (booking.ownerId !== userId && booking.sitterId !== userId) {
    throw new Error("You are not authorized to view this booking");
  }

  return booking;
};

const cancelBookingByOwnerInDB = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Booking not found");
  if (booking.ownerId !== userId) throw new Error("Unauthorized");
  if (booking.status !== "PENDING") {
    throw new Error("Only pending bookings can be cancelled");
  }

  return await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
};

export const BookingService = {
  createBookingIntoDB,
  getUserBookingsFromDB,
  getSingleBookingFromDB,
  cancelBookingByOwnerInDB,
};