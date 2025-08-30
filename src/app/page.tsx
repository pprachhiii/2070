"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import type { Timeline} from "@/lib/types"; 

export default function HomePage() {
  const [year, setYear] = useState<2025 | 2070>(2025);
  const [data, setData] = useState<Timeline | null>(null); 

  useEffect(() => {
    fetch(`/api/timeline/${year}`)
      .then((res) => res.json())
      .then((json: Timeline) => setData(json));
  }, [year]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Carbon Time Machine</h1>

      <div className="flex justify-center space-x-4">
        <Button onClick={() => setYear(2025)} variant={year === 2025 ? "default" : "outline"}>
          2025
        </Button>
        <Button onClick={() => setYear(2070)} variant={year === 2070 ? "default" : "outline"}>
          2070
        </Button>
      </div>

      {data && (
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">{data.name ?? `Timeline #${data.id}`}</h2>
          <LineChart width={500} height={300} data={data.chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </div>
  );
}
