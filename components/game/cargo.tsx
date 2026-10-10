"use client";

import { MATERIALS, PLANETS } from "@/lib/game/data";
import { useGame } from "@/lib/game/store";

export function CargoScreen() {
  const cargo = useGame((s) => s.cargo);
  const rows = Object.entries(cargo)
    .filter(([, n]) => n > 0)
    .map(([id, qty]) => ({ mat: MATERIALS[id], qty, planets: PLANETS.filter((p) => p.materials.includes(id)) }))
    .sort((a, b) => a.mat.name.localeCompare(b.mat.name));

  return (
    <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
      <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Hold</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Cargo</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Every unit here was taken from a solar-system body that actually contains it. Origin worlds are listed
        against NASA mission chemistry, not a loot table.
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Hold is empty. Survey a site on Mars and extract.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line">
          {rows.map((row) => (
            <li key={row.mat.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="text-base font-medium text-fg">{row.mat.name}</h2>
                  <span className="font-mono text-[11px] text-accent">{row.mat.formula}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{row.mat.description}</p>
                <p className="mt-2 font-mono text-[11px] text-subtle">
                  Known on {row.planets.map((p) => p.name).join(" · ")}
                </p>
              </div>
              <div className="font-mono text-2xl tabular-nums text-fg sm:text-right">{row.qty}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
