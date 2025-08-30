import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { profileId, name, choices, category } = await req.json();

  // Rich simulation engine
  const fullResults = {
    environment: {
      co2: choices.diet === "Meat-heavy" ? 480 : 340,
      temperature: choices.energy === "Fossil Fuels" ? 3.2 : 1.5,
      biodiversity: choices.hobbies === "Gardening" ? "high" : "medium",
      seaLevel: choices.energy === "Fossil Fuels" ? "1.2m rise" : "0.5m rise",
      airQuality: choices.transport === "Car" ? "poor" : "clean",
      deforestation: choices.hobbies === "Travel" ? "high" : "low",
    },
    humans: {
      health: choices.diet === "Vegan" ? "improved" : "average",
      foodSecurity: choices.diet === "Meat-heavy" ? "strained" : "stable",
      migration: choices.energy === "Fossil Fuels" ? "high" : "low",
      economy: choices.transport === "Car" ? "fragile" : "resilient",
      lifespan: choices.diet === "Vegan" ? "longer" : "shorter",
    },
    animals: {
      extinctionRisk: choices.diet === "Meat-heavy" ? "high" : "low",
      habitatLoss: choices.transport === "Car" ? "severe" : "minimal",
      populationTrend: choices.hobbies === "Gardening" ? "growing" : "declining",
      oceanHealth: choices.energy === "Fossil Fuels" ? "acidifying" : "recovering",
      speciesDiversity: choices.hobbies === "Travel" ? "declining" : "stable",
    },
  };

  const results = category && category !== "all" ? { [category]: fullResults[category] } : fullResults;

  const simulation = await prisma.simulation.create({
    data: {
      profileId: profileId || null,
      name: name || `Simulation ${new Date().toISOString()}`,
      choices,
      results: {
        create: {
          environment: results.environment || {},
          humans: results.humans || {},
          animals: results.animals || {},
        },
      },
    },
    include: { results: true },
  });

  return NextResponse.json(simulation);
}
