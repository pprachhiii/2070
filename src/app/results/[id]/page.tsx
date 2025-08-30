import { prisma } from "@/lib/prisma";

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const simulation = await prisma.simulation.findUnique({
    where: { id: Number(params.id) },
    include: { results: true },
  });

  if (!simulation) return <p>Simulation not found</p>;

  const { results } = simulation;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{simulation.name || "Simulation"}</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {results?.environment && <pre>{JSON.stringify(results.environment, null, 2)}</pre>}
        {results?.humans && <pre>{JSON.stringify(results.humans, null, 2)}</pre>}
        {results?.animals && <pre>{JSON.stringify(results.animals, null, 2)}</pre>}
      </div>
    </div>
  );
}
