import { Booking } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createBookingIntoDB = async (
  payload: Omit<Booking, "id" | "createdAt" | "updateAt">,
  userId: string,
) => {
  // 1. user exist
  // 2. user is owner
  // 3. pets belons to that owner
  // 4. service exists
  // 5. sitter exists
  // 6. calculate the Total price
  // 7.  Create Booking

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error(" User not found");
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: payload.petId,
    },
  });

  if (!pet) {
    throw new Error(" Pet not found");
  }

  if (pet.ownerId !== userId) {
    throw new Error(" Pet does not belong to the user");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: payload.serviceId,
    },
  });

  if (!service) {
    throw new Error(" Service not found");
  }

  //  Calculation

  const startTime = new Date(payload.startDate).getDate(); // Miliseconds 1
  const endTime = new Date(payload.endDate).getTime(); // Miliseconds  10

  if (endTime <= startTime) {
    throw new Error("End date must be greater than start date");
  }

  const duration = endTime - startTime;
  console.log(duration);

  const durationInHour = duration / (1000 * 60 * 60); // Convert milliseconds to hours

  const totalPrice = durationInHour * service.price;
  const result = await prisma.booking.create({
    data: {
      ...payload,
      totalPrice,
    },
  });
  return result;
};

export const BookingService = {
  // Add service methods here
  createBookingIntoDB,
};
