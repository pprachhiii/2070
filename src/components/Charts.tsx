"use client";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts";


type Datum = { metric: string; value: number };
export default function Charts({ data }: { data: Datum[] }) {
return (
<div className="h-64 w-full rounded-2xl border p-3">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="metric" />
<YAxis />
<Tooltip />
<Bar dataKey="value" fill="#3b82f6" radius={[12,12,0,0]} />
</BarChart>
</ResponsiveContainer>
</div>
);
}