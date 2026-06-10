import { PrismaClient } from "@prisma/client";
import { closterWestSideScheduleMeta2026 } from "../src/lib/closter/west-side-2026";

const prisma = new PrismaClient();

async function main() {
  const house = await prisma.house.upsert({
    where: { slug: "130-durie-ave" },
    update: {
      systems: "Boiler, sump pump, central air",
      appliances: "Washer, dryer, refrigerator",
      warrantyDetails: "Boiler warranty active through 2028",
      serviceNotes: "Boiler serviced in March 2026"
    },
    create: {
      slug: "130-durie-ave",
      addressLine1: "130 Durie Ave",
      city: "Closter",
      state: "NJ",
      postalCode: "07624",
      systems: "Boiler, sump pump, central air",
      appliances: "Washer, dryer, refrigerator",
      warrantyDetails: "Boiler warranty active through 2028",
      serviceNotes: "Boiler serviced in March 2026"
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

  await prisma.task.upsert({
    where: { id: "adhoc-review-utility-bill" },
    update: {
      title: "Review utility bill",
      category: "finance",
      dueDate: "2026-03-22",
      dueAt: new Date("2026-03-22T18:00:00-04:00"),
      notes: "Monthly utility review",
      assigneeId: "shared-seed"
    },
    create: {
      id: "adhoc-review-utility-bill",
      houseId: house.id,
      title: "Review utility bill",
      category: "finance",
      dueDate: "2026-03-22",
      dueAt: new Date("2026-03-22T18:00:00-04:00"),
      notes: "Monthly utility review",
      assigneeId: "shared-seed"
    }
  });

  await prisma.task.upsert({
    where: { id: "adhoc-replace-hvac-filter" },
    update: {
      title: "Replace HVAC filter",
      category: "maintenance",
      dueDate: "2026-03-21",
      dueAt: new Date("2026-03-21T10:00:00-04:00"),
      notes: "Spring filter replacement",
      assigneeId: "household-seed"
    },
    create: {
      id: "adhoc-replace-hvac-filter",
      houseId: house.id,
      title: "Replace HVAC filter",
      category: "maintenance",
      dueDate: "2026-03-21",
      dueAt: new Date("2026-03-21T10:00:00-04:00"),
      notes: "Spring filter replacement",
      assigneeId: "household-seed"
    }
  });

  await prisma.record.upsert({
    where: { id: "record-pseg" },
    update: {
      title: "PSE&G",
      type: "Utility",
      date: "2026-03-01",
      provider: "PSE&G",
      notes: "March bill on file",
      fileUrl: "https://example.com/pseg-march.pdf"
    },
    create: {
      id: "record-pseg",
      houseId: house.id,
      title: "PSE&G",
      type: "Utility",
      date: "2026-03-01",
      provider: "PSE&G",
      notes: "March bill on file",
      fileUrl: "https://example.com/pseg-march.pdf"
    }
  });

  await prisma.record.upsert({
    where: { id: "record-boiler-warranty" },
    update: {
      title: "Boiler Warranty",
      type: "Warranty",
      date: "2026-03-10",
      provider: "BoilerCo",
      notes: "Active through 2028"
    },
    create: {
      id: "record-boiler-warranty",
      houseId: house.id,
      title: "Boiler Warranty",
      type: "Warranty",
      date: "2026-03-10",
      provider: "BoilerCo",
      notes: "Active through 2028"
    }
  });

  await prisma.contact.upsert({
    where: { id: "contact-pseg-support" },
    update: {
      name: "PSE&G Support",
      type: "Utility",
      phone: "800-436-7734",
      email: "support@example.com",
      notes: "Utility billing support",
      houseId: house.id,
      linkedRecordId: "record-pseg"
    },
    create: {
      id: "contact-pseg-support",
      name: "PSE&G Support",
      type: "Utility",
      phone: "800-436-7734",
      email: "support@example.com",
      notes: "Utility billing support",
      houseId: house.id,
      linkedRecordId: "record-pseg"
    }
  });

  await prisma.contact.upsert({
    where: { id: "contact-local-plumber" },
    update: {
      name: "Local Plumber",
      type: "Vendor",
      phone: "201-555-0118",
      email: "plumber@example.com",
      notes: "Annual boiler service",
      houseId: house.id,
      linkedRecordId: "record-boiler-warranty"
    },
    create: {
      id: "contact-local-plumber",
      name: "Local Plumber",
      type: "Vendor",
      phone: "201-555-0118",
      email: "plumber@example.com",
      notes: "Annual boiler service",
      houseId: house.id,
      linkedRecordId: "record-boiler-warranty"
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
