import { getOrSetAnonId } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import Link from "next/link"; 

export default async function Timelines() {
  const uid = await getOrSetAnonId(); 
  const items = await prisma.timeline.findMany({
    where: { OR: [{ profileId: uid }, { profileId: null }] },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Timelines</h1>
        <Link
          href="/timeline/new"
          className="rounded-2xl border px-4 py-2"
        >
          New Timeline
        </Link>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t) => (
          <li key={t.id} className="rounded-2xl border p-4">
            <div className="text-sm text-gray-600">Year {t.year}</div>
            <div className="font-semibold">
              {t.name ?? `Timeline #${t.id}`}
            </div>
            <Link
              href={`/timeline/${t.id}`}
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              Open →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
