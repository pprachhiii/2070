import { getOrSetAnonId } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function NewTimeline() {
  const uid = await getOrSetAnonId(); 
  const t = await prisma.timeline.create({
    data: {
      profileId: uid,
      year: 2025,
      name: "My Scenario",
      results: { co2ppm: 420, temperature: 1.2 },
    },
  });
  redirect(`/timeline/${t.id}`);
}
