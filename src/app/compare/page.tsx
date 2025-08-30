"use client";

import { useEffect, useState } from "react";

export default function ComparePage() {
  const [simulations, setSimulations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/simulations")
      .then(res => res.json())
      .then(data => setSimulations(data));
  }, []);

  if (!simulations.length) return <p>Loading simulations...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Compare Simulations</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border px-2">Name</th>
              <th className="border px-2">Diet</th>
              <th className="border px-2">Transport</th>
              <th className="border px-2">Energy</th>
              <th className="border px-2">Hobbies</th>
              <th className="border px-2">Humans</th>
              <th className="border px-2">Environment</th>
              <th className="border px-2">Animals</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map(sim => (
              <tr key={sim.id}>
                <td className="border px-2">{sim.name}</td>
                <td className="border px-2">{sim.choices.diet}</td>
                <td className="border px-2">{sim.choices.transport}</td>
                <td className="border px-2">{sim.choices.energy}</td>
                <td className="border px-2">{sim.choices.hobbies}</td>
                <td className="border px-2">{JSON.stringify(sim.results.humans)}</td>
                <td className="border px-2">{JSON.stringify(sim.results.environment)}</td>
                <td className="border px-2">{JSON.stringify(sim.results.animals)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
