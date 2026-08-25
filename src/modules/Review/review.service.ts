import { prisma } from "../../lib/prisma";

const createReviewIntoDB = async (
  payload: { bookingId: string; rating: number; comment: string },
  ownerId: string
) => {
  // 1. Check if booking exists and belongs to owner
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.ownerId !== ownerId) {
    throw new Error("You are not authorized to review this booking");
  }

  // 2. Ensure booking is completed
  if (booking.status !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }

  // 3. Check if review already exists
  const existingReview = await prisma.review.findUnique({
    where: { bookingId: payload.bookingId },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }

  // 4. Get SitterProfile ID
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: booking.sitterId },
  });

  if (!sitterProfile) {
    throw new Error("Sitter profile not found");
  }

  // 5. Create Review
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      bookingId: payload.bookingId,
      ownerId,
      sitterId: sitterProfile.id,
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return result;
};

const getSitterReviewsFromDB = async (sitterProfileId: string) => {
  const result = await prisma.review.findMany({
    where: { sitterId: sitterProfileId },
    include: {
      owner: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

export const ReviewService = {
  createReviewIntoDB,
  getSitterReviewsFromDB,
};