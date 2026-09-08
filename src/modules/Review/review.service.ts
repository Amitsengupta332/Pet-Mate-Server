import { prisma } from "../../lib/prisma";

// 1. Create Review
const createReviewIntoDB = async (
  payload: { bookingId: string; rating: number; comment: string },
  ownerId: string
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.ownerId !== ownerId) {
    throw new Error("You are not authorized to review this booking");
  }

  if (booking.status !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }

  const existingReview = await prisma.review.findUnique({
    where: { bookingId: payload.bookingId },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }

  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: { sitterId: booking.sitterId },
  });

  if (!sitterProfile) {
    throw new Error("Sitter profile not found");
  }

  return await prisma.review.create({
    data: {
      rating: Number(payload.rating),
      comment: payload.comment,
      bookingId: payload.bookingId,
      ownerId,
      sitterId: sitterProfile.id,
    },
    include: {
      owner: { select: { id: true, name: true, email: true } },
    },
  });
};

// 2. Update Review (নতুন)
const updateReviewIntoDB = async (
  reviewId: string,
  ownerId: string,
  payload: { rating?: number; comment?: string }
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) throw new Error("Review not found");
  if (review.ownerId !== ownerId) {
    throw new Error("You are not authorized to update this review");
  }

  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: payload.rating ? Number(payload.rating) : undefined,
      comment: payload.comment,
    },
  });
};

// 3. Delete Review (নতুন)
const deleteReviewFromDB = async (reviewId: string, ownerId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) throw new Error("Review not found");
  if (review.ownerId !== ownerId) {
    throw new Error("You are not authorized to delete this review");
  }

  return await prisma.review.delete({
    where: { id: reviewId },
  });
};

// 4. Get Sitter Reviews (Public)
const getSitterReviewsFromDB = async (sitterProfileId: string) => {
  return await prisma.review.findMany({
    where: { sitterId: sitterProfileId },
    include: {
      owner: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = {
  createReviewIntoDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
  getSitterReviewsFromDB,
};