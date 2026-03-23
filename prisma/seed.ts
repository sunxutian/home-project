import { PrismaClient } from "@prisma/client";
import { closterWestSideScheduleMeta2026 } from "../src/lib/closter/west-side-2026";

const prisma = new PrismaClient();

async function main() {
  const house = await prisma.house.upsert({
    where: { slug: "130-durie-ave" },
    update: {},
    create: {
      slug: "130-durie-ave",
      addressLine1: "130 Durie Ave",
      city: "Closter",
      state: "NJ",
      postalCode: "07624"
    }
  });

  const memberData = [
    { name: "Household", color: "#9b6b43" },
    { name: "Shared", color: "#365c4f" }
  ];

  for (const member of memberData) {
    await prisma.householdMember.upsert({
      where: { id: `${member.name.toLowerCase()}-seed` },
      update: {
        name: member.name,
        color: member.color,
        active: true
      },
      create: {
        id: `${member.name.toLowerCase()}-seed`,
        name: member.name,
        color: member.color,
        active: true
      }
    });
  }

  for (const stream of ["garbage", "recycling"] as const) {
    await prisma.task.upsert({
      where: { id: `municipal-${stream}-west-2026` },
      update: {
        title: stream === "garbage" ? "Take out garbage" : "Take out recycling",
        category: "municipal",
        recurrence: "municipal",
        scheduleKey: `closter-west-2026-${stream}`,
        sourceMetadata: JSON.stringify({
          source: "closter-dpw-2026-pdf",
          side: "west",
          timezone: closterWestSideScheduleMeta2026.timezone
        })
      },
      create: {
        id: `municipal-${stream}-west-2026`,
        houseId: house.id,
        title: stream === "garbage" ? "Take out garbage" : "Take out recycling",
        category: "municipal",
        recurrence: "municipal",
        scheduleKey: `closter-west-2026-${stream}`,
        sourceMetadata: JSON.stringify({
          source: "closter-dpw-2026-pdf",
          side: "west",
          timezone: closterWestSideScheduleMeta2026.timezone
        })
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
