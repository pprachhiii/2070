"use client";
import { Innovation } from "@/lib/types";

export default function Innovations({ innovations }: { innovations: Innovation[] }) {
  return (
    <div className="bg-green-50 p-4 rounded-2xl shadow-md">
      <h3 className="text-lg font-bold mb-2">💡 Eco-Tech Innovations</h3>
      <ul className="space-y-2">
        {innovations.map((i) => (
          <li key={i.id} className="p-2 border rounded-xl bg-white">
            <strong>{i.name}</strong>
            <p className="text-sm text-gray-600">{i.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
