import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all policies
export async function GET() {
  const policies = await prisma.policy.findMany();
  return NextResponse.json(policies);
}

// POST create policy
export async function POST(req: NextRequest) {
  const data = await req.json();
  const policy = await prisma.policy.create({ data });
  return NextResponse.json(policy);
}

