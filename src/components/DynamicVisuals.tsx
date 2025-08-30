"use client";
import Image from "next/image";
import { useMemo } from "react";


type Props = { year: 2025 | 2070; co2ppm: number };
export default function DynamicVisuals({ year, co2ppm }: Props) {
const src = useMemo(() => (year === 2025 ? "/city_2025.jpg" : "/city_2070.jpg"), [year]);
const caption = year === 2025 ? "Present-day skyline" : "Speculative 2070 skyline";
return (
<figure className="rounded-2xl overflow-hidden shadow">
<Image src={src} alt={caption} width={1280} height={720} className="w-full h-auto" />
<figcaption className="p-3 text-sm text-gray-600 flex items-center justify-between">
<span>{caption}</span>
<span>CO₂: {co2ppm} ppm</span>
</figcaption>
</figure>
);
}