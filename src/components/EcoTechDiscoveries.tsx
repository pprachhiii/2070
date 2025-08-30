import { Lightbulb } from "lucide-react";


type Item = { name: string; description: string };
const FUTURE: Item[] = [
{ name: "Carbon Towers", description: "Vertical DAC towers scrubbing urban air." },
{ name: "Algae Farms", description: "Coastal bioreactors turning CO₂ into biofuels." },
{ name: "Solid-State Storage", description: "Store captured carbon in mineralized blocks." }
];
export default function EcoTechDiscoveries() {
return (
<div className="grid gap-3">
{FUTURE.map((f) => (
<div key={f.name} className="rounded-2xl border p-4">
<div className="flex items-center gap-2 font-semibold"><Lightbulb className="h-4 w-4"/> {f.name}</div>
<p className="text-sm text-gray-600 mt-1">{f.description}</p>
</div>
))}
</div>
);
}