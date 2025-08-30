// lib/simulator.ts

export type PolicyInput = {
  name: string;
  strength: number; // between 0 and 1
};

export type SimulationResult = {
  co2ppm: number;
  temperature: number;
};

export function runSimulation(year: 2025 | 2070, policies: PolicyInput[]) {
  // --- Baseline values (no policies) ---
  const baseline = {
    2025: { co2ppm: 420, temperature: 1.5 },
    2070: { co2ppm: 650, temperature: 3.0 },
  } as const;

  const base = baseline[year];

  // --- Policy effect calculation ---
  // stronger policies reduce CO₂ growth and temperature
  let reductionFactor = policies.reduce(
    (acc, p) => acc + p.strength * 0.2, // each policy can cut up to 20%
    0
  );

  // Clamp between 0 and 0.8 (no "magical" full prevention)
  reductionFactor = Math.min(reductionFactor, 0.8);

  // Apply reduction
  const co2ppm = base.co2ppm * (1 - reductionFactor);
  const temperature =
    base.temperature * (1 - reductionFactor * 0.7); // less effect on temp than on CO₂

  return {
    result: {
      co2ppm: parseFloat(co2ppm.toFixed(1)),
      temperature: parseFloat(temperature.toFixed(2)),
    },
    details: {
      baseline: base,
      appliedPolicies: policies,
      reductionFactor,
    },
  };
}
