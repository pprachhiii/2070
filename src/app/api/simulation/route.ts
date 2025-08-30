import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const simulations = await prisma.simulation.findMany({
    include: { results: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(simulations);
}
