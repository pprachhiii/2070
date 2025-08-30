"use client";
import { Policy } from "@/lib/types";

export default function Policies({ policies }: { policies: Policy[] }) {
  return (
    <div className="bg-blue-50 p-4 rounded-2xl shadow-md">
      <h3 className="text-lg font-bold mb-2">📜 Policies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div key={p.id} className="p-3 border rounded-xl bg-white shadow">
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-sm text-gray-600">{p.description}</p>
            <pre className="text-xs text-gray-500 mt-2">
              {JSON.stringify(p.effect, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
