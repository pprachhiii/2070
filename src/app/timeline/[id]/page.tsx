import { prisma } from "@/lib/prisma";
import Charts from "@/components/Charts";
import PolicySimulator from "@/components/PolicySimulator";


export default async function TimelineDetail({ params }: { params: { id: string } }){
const id = Number(params.id);
const t = await prisma.timeline.findUnique({ where: { id }, include: { chartData: true, policies: true } });
if (!t) return <div>Not found.</div>;
const chart = t.chartData.map(c => ({ metric: c.metric, value: c.value }));
return (
<div className="grid lg:grid-cols-3 gap-6">
<section className="lg:col-span-2 grid gap-6">
<h1 className="text-2xl font-semibold">{t.name ?? `Timeline #${t.id}`} (Year {t.year})</h1>
<Charts data={chart} />
</section>
<aside className="grid gap-6">
<PolicySimulator defaultYear={t.year as 2025 | 2070} />
</aside>
</div>
);
}