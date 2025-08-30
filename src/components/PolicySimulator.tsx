"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { runSimulation, PolicyInput } from "@/lib/simulator";


export default function PolicySimulator({ defaultYear=2025 }: { defaultYear?: 2025 | 2070 }) {
const [year, setYear] = useState<2025 | 2070>(defaultYear);
const [policies, setPolicies] = useState<PolicyInput[]>([
{ name: "Carbon Tax", strength: 0.5 },
{ name: "Renewables", strength: 0.6 },
]);
const sim = runSimulation(year, policies);


return (
<div className="rounded-2xl border p-4 grid gap-4">
<div className="flex items-center justify-between">
<div className="text-sm">Year: <b>{year}</b></div>
<div className="flex gap-2">
<Button variant="outline" onClick={() => setYear(2025)}>2025</Button>
<Button variant="outline" onClick={() => setYear(2070)}>2070</Button>
</div>
</div>
<div className="grid gap-2">
{policies.map((p, i) => (
<div key={i} className="flex items-center gap-3">
<input
className="flex-1 rounded-xl border px-3 py-2"
value={p.name}
onChange={(e) => setPolicies(ps => ps.map((x, idx) => idx===i?{...x, name:e.target.value}:x))}
/>
<input
type="range" min={0} max={1} step={0.05} value={p.strength}
onChange={(e) => setPolicies(ps => ps.map((x, idx) => idx===i?{...x, strength: Number(e.target.value)}:x))}
className="flex-1"
/>
<span className="w-10 text-right text-sm">{(p.strength*100).toFixed(0)}%</span>
</div>
))}
<Button onClick={() => setPolicies(ps => [...ps, { name: "New Policy", strength: 0.3 }])}>Add Policy</Button>
</div>
<div className="text-sm text-gray-700">Projected CO₂: <b>{sim.result.co2ppm} ppm</b> · Temperature: <b>{sim.result.temperature} °C</b></div>
</div>
);
}