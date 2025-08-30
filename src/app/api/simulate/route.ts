import { NextRequest, NextResponse } from "next/server";
import { runSimulation } from "@/lib/simulator";


export async function POST(req: NextRequest) {
const body = await req.json();
const { year, policies } = body as { year: 2025 | 2070; policies: { name: string; strength: number }[] };
const sim = runSimulation(year, policies);
return NextResponse.json(sim);
}