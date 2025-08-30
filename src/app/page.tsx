"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type Choices = {
  diet: string;
  transport: string;
  energy: string;
  hobbies: string;
};

type SimulationResults = {
  environment?: any;
  humans?: any;
  animals?: any;
};

export default function HomePage() {
  const [choices, setChoices] = useState<Choices>({
    diet: "",
    transport: "",
    energy: "",
    hobbies: "",
  });
  const [name, setName] = useState("");
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [category, setCategory] = useState<"all" | "humans" | "animals" | "environment">("all");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof Choices, value: string) =>
    setChoices((prev) => ({ ...prev, [field]: value }));

  const runSimulation = async (cat: typeof category) => {
    setCategory(cat);
    setLoading(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: null, name, choices, category: cat }),
      });
      const data = await res.json();
      setResults(data.results);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-emerald-50 to-emerald-200">
      <h1 className="text-4xl font-bold mb-4">🌍 Carbon Time Machine</h1>

      <input
        type="text"
        placeholder="Simulation Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 rounded w-full max-w-md"
      />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {["Diet", "Transport", "Energy", "Hobbies"].map((cat) => (
          <Card key={cat}>
            <CardHeader><CardTitle>{cat}</CardTitle></CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              {(cat === "Diet" ? ["Meat-heavy", "Vegetarian", "Vegan"] :
               cat === "Transport" ? ["Car", "Public Transit", "Bike/Walk"] :
               cat === "Energy" ? ["Fossil Fuels", "Mixed", "Renewable"] :
               ["Shopping", "Gardening", "Travel", "DIY"]).map(opt => (
                <Button key={opt} onClick={() => handleChange(cat.toLowerCase() as keyof Choices, opt)}>
                  {opt}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "humans", "animals", "environment"].map(cat => (
          <Button key={cat} onClick={() => runSimulation(cat as any)} disabled={loading}>
            {loading ? "⏳..." : `Run ${cat}`}
          </Button>
        ))}
      </div>

      {results && (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {results.environment && <Card className="bg-green-50"><CardHeader><CardTitle>Environment</CardTitle></CardHeader><CardContent>{JSON.stringify(results.environment, null, 2)}</CardContent></Card>}
          {results.humans && <Card className="bg-blue-50"><CardHeader><CardTitle>Humans</CardTitle></CardHeader><CardContent>{JSON.stringify(results.humans, null, 2)}</CardContent></Card>}
          {results.animals && <Card className="bg-amber-50"><CardHeader><CardTitle>Animals</CardTitle></CardHeader><CardContent>{JSON.stringify(results.animals, null, 2)}</CardContent></Card>}
        </div>
      )}

      <footer className="mt-12 text-center text-gray-600">© 2025 Carbon Time Machine</footer>
    </div>
  );
}
