import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ChartData } from "@/lib/types"; 

type ChartDataInput = Omit<ChartData, "id" | "timelineId">; // metric + value only

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const timelineId = Number(params.id);
  const body: { data: ChartDataInput[] } = await req.json();

  // clear old chart data
  await prisma.chartData.deleteMany({ where: { timelineId } });

  // recreate chart data
  const created = await prisma.$transaction(
    body.data.map((d) =>
      prisma.chartData.create({
        data: { timelineId, metric: d.metric, value: d.value },
      })
    )
  );

  return NextResponse.json(created);
}
