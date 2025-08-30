-- CreateTable
CREATE TABLE "public"."Timeline" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT,
    "name" TEXT,
    "year" INTEGER NOT NULL,
    "results" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Policy" (
    "id" SERIAL NOT NULL,
    "timelineId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "effect" JSONB NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Innovation" (
    "id" SERIAL NOT NULL,
    "timelineId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Innovation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChartData" (
    "id" SERIAL NOT NULL,
    "timelineId" INTEGER NOT NULL,
    "metric" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ChartData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Policy" ADD CONSTRAINT "Policy_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "public"."Timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Innovation" ADD CONSTRAINT "Innovation_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "public"."Timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChartData" ADD CONSTRAINT "ChartData_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "public"."Timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
