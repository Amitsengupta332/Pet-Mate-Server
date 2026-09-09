import { Role, ServiceType, BookingStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function runSeed() {
  console.log("🌱 Seeding realistic PetMate data...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // ১. ডুপ্লিকেট কনফ্লিক্ট এড়াতে আগের টেস্ট ডাটা ক্লিন করা (Admin ছাড়া)
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.sitterProfiles.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.user.deleteMany({
    where: {
      role: {
        not: Role.ADMIN,
      },
    },
  });

  // ২. জেনুইন সিটার ও সার্ভিস ডাটা
  const sittersData = [
    {
      name: "Sarah Jenkins",
      email: "sarah.sitter@gmail.com",
      bio: "Certified veterinary assistant with 5+ years caring for senior dogs and administering oral/injectable medications.",
      experience: "5 years",
      hourlyRate: 30,
      services: [
        {
          serviceType: ServiceType.WALKING,
          price: 25.0,
          description: "45-minute structured walk with hydration breaks.",
        },
        {
          serviceType: ServiceType.BOARDING,
          price: 65.0,
          description: "Overnight home stay with 24/7 medical supervision.",
        },
        {
          serviceType: ServiceType.SITTING,
          price: 22.0,
          description: "Drop-in home check, litter refresh, and meal prep.",
        },
      ],
    },
    {
      name: "Marcus Vance",
      email: "marcus.walker@gmail.com",
      bio: "Active canine trainer and distance runner. Specializes in high-energy working breeds, leash manners, and recall.",
      experience: "4 years",
      hourlyRate: 28,
      services: [
        {
          serviceType: ServiceType.WALKING,
          price: 30.0,
          description: "60-minute outdoor power walk and trail exercise.",
        },
        {
          serviceType: ServiceType.DAYCARE,
          price: 45.0,
          description: "Full-day pack socialization in a secure private run.",
        },
      ],
    },
    {
      name: "Sophia Chen",
      email: "sophia.chen.pets@gmail.com",
      bio: "Feline behavior specialist dedicated to low-stress in-home care for timid rescue cats and senior pets.",
      experience: "3 years",
      hourlyRate: 22,
      services: [
        {
          serviceType: ServiceType.SITTING,
          price: 24.0,
          description:
            "Quiet in-home visits: brushing, fresh food, and gentle play.",
        },
        {
          serviceType: ServiceType.BOARDING,
          price: 50.0,
          description:
            "Dog-free, quiet overnight suite for sensitive indoor cats.",
        },
      ],
    },
    {
      name: "David Miller",
      email: "david.miller.dogs@gmail.com",
      bio: "Operates a secure 1-acre suburban property. Expert in handling German Shepherds, Rottweilers, and large breeds.",
      experience: "6 years",
      hourlyRate: 35,
      services: [
        {
          serviceType: ServiceType.BOARDING,
          price: 70.0,
          description:
            "Farm-style overnight boarding with unlimited yard play.",
        },
        {
          serviceType: ServiceType.DAYCARE,
          price: 40.0,
          description:
            "Supervised outdoor play for socialized medium/large dogs.",
        },
      ],
    },
    {
      name: "Amina Rahman",
      email: "amina.sitters@gmail.com",
      bio: "Gentle caregiver dedicated to puppies and toy breeds. Detailed photo logs and updates after every visit.",
      experience: "2 years",
      hourlyRate: 20,
      services: [
        {
          serviceType: ServiceType.SITTING,
          price: 20.0,
          description:
            "30-minute drop-in puppy check, feeding, and potty break.",
        },
        {
          serviceType: ServiceType.WALKING,
          price: 22.0,
          description: "Gentle neighborhood stroll for small and senior dogs.",
        },
      ],
    },
    {
      name: "Liam O'Connor",
      email: "liam.k9care@gmail.com",
      bio: "Positive-reinforcement pet walker focusing on loose-leash training, socialization, and energetic outdoor runs.",
      experience: "4 years",
      hourlyRate: 26,
      services: [
        {
          serviceType: ServiceType.WALKING,
          price: 28.0,
          description: "45-minute structured walk reinforcing basic commands.",
        },
        {
          serviceType: ServiceType.DAYCARE,
          price: 42.0,
          description: "Half-day indoor agility and play sessions.",
        },
      ],
    },
  ];

  const createdSitters = [];
  for (const s of sittersData) {
    const sitterUser = await prisma.user.create({
      data: {
        name: s.name,
        email: s.email,
        password: hashedPassword,
        role: Role.SITTER,
        sitterProfile: {
          create: {
            bio: s.bio,
            experience: s.experience,
            hourlyRate: s.hourlyRate,
            services: {
              create: s.services,
            },
          },
        },
      },
      include: {
        sitterProfile: {
          include: { services: true },
        },
      },
    });
    createdSitters.push(sitterUser);
  }

  // ৩. জেনুইন পেট ওনার ও পেট ডাটা
  const ownersData = [
    {
      name: "Emily Watson",
      email: "emily.watson@gmail.com",
      pets: [
        {
          name: "Luna",
          breed: "French Bulldog",
          age: "2 years",
          notes: "Sensitive to hot weather. Keep walks under 20 mins.",
        },
        {
          name: "Cleo",
          breed: "Siamese Cat",
          age: "4 years",
          notes: "Indoor-only. Feed half-can wet food at 6 PM.",
        },
      ],
    },
    {
      name: "Tariq Mahmud",
      email: "tariq.mahmud@yahoo.com",
      pets: [
        {
          name: "Rocky",
          breed: "German Shepherd",
          age: "3 years",
          notes: "Strong puller on leash. Reactive to skateboards.",
        },
      ],
    },
    {
      name: "Jessica Taylor",
      email: "jessica.t@outlook.com",
      pets: [
        {
          name: "Cooper",
          breed: "Golden Retriever",
          age: "1.5 years",
          notes: "Friendly pup. Allergic to chicken - give salmon treats only.",
        },
      ],
    },
    {
      name: "Michael Chang",
      email: "michael.chang@gmail.com",
      pets: [
        {
          name: "Bella",
          breed: "Shih Tzu",
          age: "5 years",
          notes: "Needs daily tear-stain wipes. Shy around big dogs.",
        },
      ],
    },
    {
      name: "Nadia Hasan",
      email: "nadia.hasan@gmail.com",
      pets: [
        {
          name: "Max",
          breed: "Australian Shepherd",
          age: "3 years",
          notes: "Loves Frisbee. Needs plenty of mental puzzle toys.",
        },
        {
          name: "Oliver",
          breed: "British Shorthair",
          age: "2 years",
          notes: "Loves head scratches. Check water fountain daily.",
        },
      ],
    },
    {
      name: "Daniel Craig",
      email: "daniel.craig@gmail.com",
      pets: [
        {
          name: "Bailey",
          breed: "Beagle",
          age: "2 years",
          notes: "Very scent-driven. Never drop leash in open areas.",
        },
      ],
    },
  ];

  const createdOwners = [];
  for (const o of ownersData) {
    const ownerUser = await prisma.user.create({
      data: {
        name: o.name,
        email: o.email,
        password: hashedPassword,
        role: Role.OWNER,
        pets: {
          create: o.pets,
        },
      },
      include: { pets: true },
    });
    createdOwners.push(ownerUser);
  }

  // ৪. কমপ্লিটেড বুকিং ও রিভিউ
  const booking1 = await prisma.booking.create({
    data: {
      ownerId: createdOwners[0].id,
      sitterId: createdSitters[0].sitterProfile!.id,
      petId: createdOwners[0].pets[0].id,
      serviceId: createdSitters[0].sitterProfile!.services[1].id,
      startDate: new Date("2026-08-15T10:00:00Z"),
      endDate: new Date("2026-08-17T10:00:00Z"),
      totalPrice: 130.0,
      status: BookingStatus.COMPLETED,
      notes: "Please give Luna her allergy drops with breakfast.",
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment:
        "Sarah took exceptional care of Luna! Her veterinary background gave me complete peace of mind.",
      ownerId: createdOwners[0].id,
      sitterId: createdSitters[0].sitterProfile!.id,
      bookingId: booking1.id,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      ownerId: createdOwners[1].id,
      sitterId: createdSitters[1].sitterProfile!.id,
      petId: createdOwners[1].pets[0].id,
      serviceId: createdSitters[1].sitterProfile!.services[0].id,
      startDate: new Date("2026-08-20T14:00:00Z"),
      endDate: new Date("2026-08-20T15:00:00Z"),
      totalPrice: 30.0,
      status: BookingStatus.COMPLETED,
      notes: "Keep Rocky on a short leash near the highway.",
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment:
        "Marcus handled Rocky effortlessly despite his prey drive. Rocky returned home calm and happy.",
      ownerId: createdOwners[1].id,
      sitterId: createdSitters[1].sitterProfile!.id,
      bookingId: booking2.id,
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      ownerId: createdOwners[2].id,
      sitterId: createdSitters[3].sitterProfile!.id,
      petId: createdOwners[2].pets[0].id,
      serviceId: createdSitters[3].sitterProfile!.services[0].id,
      startDate: new Date("2026-08-25T09:00:00Z"),
      endDate: new Date("2026-08-27T09:00:00Z"),
      totalPrice: 140.0,
      status: BookingStatus.COMPLETED,
      notes: "Strictly feed salmon kibble only.",
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment:
        "David's 1-acre property was dog heaven for Cooper. Constant video updates and wonderful care!",
      ownerId: createdOwners[2].id,
      sitterId: createdSitters[3].sitterProfile!.id,
      bookingId: booking3.id,
    },
  });

  // ৫. ড্যাশবোর্ড ফিল্টারিং টেস্টিংয়ের জন্য পেন্ডিং ও কনফার্মড বুকিং
  await prisma.booking.create({
    data: {
      ownerId: createdOwners[4].id,
      sitterId: createdSitters[1].sitterProfile!.id,
      petId: createdOwners[4].pets[0].id,
      serviceId: createdSitters[1].sitterProfile!.services[1].id,
      startDate: new Date("2026-09-12T08:00:00Z"),
      endDate: new Date("2026-09-12T17:00:00Z"),
      totalPrice: 45.0,
      status: BookingStatus.CONFIRMED,
      notes: "Pack Max's favorite red Frisbee.",
    },
  });

  await prisma.booking.create({
    data: {
      ownerId: createdOwners[5].id,
      sitterId: createdSitters[0].sitterProfile!.id,
      petId: createdOwners[5].pets[0].id,
      serviceId: createdSitters[0].sitterProfile!.services[0].id,
      startDate: new Date("2026-09-15T16:00:00Z"),
      endDate: new Date("2026-09-15T17:00:00Z"),
      totalPrice: 25.0,
      status: BookingStatus.PENDING,
      notes: "First time using PetMate. Excited to meet!",
    },
  });

  console.log("✅ Seed completed successfully with 100% genuine data!");
}

runSeed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
