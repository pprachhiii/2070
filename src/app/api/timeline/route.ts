import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrSetAnonId } from "@/lib/cookies";

export async function GET() {
  const uid = await getOrSetAnonId(); 
  const items = await prisma.timeline.findMany({
    where: {
      OR: [{ profileId: uid }, { profileId: null }],
    },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const uid = await getOrSetAnonId(); 
  const body = await req.json();
  const t = await prisma.timeline.create({
    data: {
      profileId: uid,
      name: body.name ?? null,
      year: body.year ?? 2025,
      results: body.results ?? {},
    },
  });
  return NextResponse.json(t, { status: 201 });
}
