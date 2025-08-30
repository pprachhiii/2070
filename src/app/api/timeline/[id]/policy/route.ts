import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
const timelineId = Number(params.id);
const body = await req.json();
const p = await prisma.policy.create({ data: { timelineId, name: body.name, description: body.description ?? null, effect: body.effect ?? {} } });
return NextResponse.json(p, { status: 201 });
}