"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Timer, Calendar } from "lucide-react";


type Props = { year: 2025 | 2070; onChange?: (y: 2025 | 2070) => void };
export default function YearSwitcher({ year: initial, onChange }: Props) {
const [year, setYear] = useState<2025 | 2070>(initial);
function toggle() {
const y = year === 2025 ? 2070 : 2025;
setYear(y);
onChange?.(y);
}
return (
<div className="flex items-center gap-3">
<Button onClick={toggle} aria-label="Toggle Year" className="gap-2">
<Timer className="h-4 w-4" /> Jump to {year === 2025 ? 2070 : 2025}
</Button>
<div className="flex items-center gap-2 text-sm text-gray-600">
<Calendar className="h-4 w-4" /> Viewing: <span className="font-semibold">{year}</span>
</div>
</div>
);
}