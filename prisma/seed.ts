import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 2025 timeline
  const t2025 = await prisma.timeline.create({
    data: {
      name: "Baseline 2025",
      year: 2025,
      results: { summary: "Current world state" },
      chartData: {
        create: [
          { metric: "CO2", value: 420 },
          { metric: "Temperature", value: 1.2 },
        ],
      },
      innovations: {
        create: [
          { name: "Solar Expansion", description: "Mass adoption of solar power." },
        ],
      },
      policies: {
        create: [
          { name: "Paris Agreement", description: "Global emission reduction goals.", effect: { impact: "Moderate" } },
        ],
      },
    },
  });

  // 2070 timeline
  const t2070 = await prisma.timeline.create({
    data: {
      name: "Future 2070",
      year: 2070,
      results: { summary: "Projected future" },
      chartData: {
        create: [
          { metric: "CO2", value: 550 },
          { metric: "Temperature", value: 3.0 },
        ],
      },
      innovations: {
        create: [
          { name: "Carbon Capture Towers", description: "Massive towers absorbing CO₂." },
          { name: "Algae Farms", description: "Ocean-based CO₂ neutralizers." },
        ],
      },
      policies: {
        create: [
          { name: "Global Carbon Tax", description: "Worldwide tax on emissions.", effect: { impact: "Strong" } },
        ],
      },
    },
  });

  console.log({ t2025, t2070 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
