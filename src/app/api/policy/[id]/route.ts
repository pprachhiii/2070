import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT update policy
export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json();
  const policy = await prisma.policy.update({ where: { id }, data });
  return NextResponse.json(policy);
}

// DELETE policy
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.policy.delete({ where: { id } });
  return NextResponse.json({ success: true });
}