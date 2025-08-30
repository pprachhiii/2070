import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
const id = Number(params.id);
const t = await prisma.timeline.findUnique({ where: { id }, include: { policies: true, innovations: true, chartData: true } });
if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
return NextResponse.json(t);
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
const id = Number(params.id);
const body = await req.json();
const t = await prisma.timeline.update({ where: { id }, data: { name: body.name, year: body.year, results: body.results } });
return NextResponse.json(t);
}


export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
const id = Number(params.id);
await prisma.timeline.delete({ where: { id } });
return NextResponse.json({ ok: true });
}