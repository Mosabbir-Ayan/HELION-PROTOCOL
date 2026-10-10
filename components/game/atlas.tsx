"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MATERIALS, PLANETS, type PlanetId } from "@/lib/game/data";
import { useGame } from "@/lib/game/store";

export function AtlasScreen() {
  const selected = useGame((s) => s.selectedPlanet);
  const selectPlanet = useGame((s) => s.selectPlanet);
  const [id, setId] = useState<PlanetId>(selected);
  const planet = PLANETS.find((p) => p.id === id)!;

  return (
    <section>
      <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Science atlas</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Planetary materials</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        A field notebook drawn from NASA Solar System Exploration fact sheets and mission instruments. If a
        material is not on this page, it is not in the game.
      </p>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {PLANETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setId(p.id);
              selectPlanet(p.id);
            }}
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-md border px-2 pr-3 text-sm",
              p.id === id ? "border-line-strong bg-elevated" : "border-line bg-surface text-muted",
            )}
          >
            <img src={p.image} alt="" className="size-7 rounded-full object-cover" crossOrigin="anonymous" />
            {p.name}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
        <img
          src={planet.image}
          alt={planet.name}
          className="mx-auto size-52 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{planet.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{planet.blurb}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-[12px]">
            <Item k="Heliocentric" v={`${planet.au} AU`} />
            <Item k="Radius" v={`${planet.radiusKm.toLocaleString()} km`} />
            <Item k="Gravity" v={planet.gravity} />
            <Item k="Access" v={planet.access} />
            <Item k="Temperature" v={planet.temp} />
            <Item k="Atmosphere" v={planet.atmosphere} />
          </dl>
          <p className="mt-4 font-mono text-[11px] text-subtle">{planet.source}</p>
          <h3 className="mt-6 text-sm font-medium">Confirmed feedstock</h3>
          <ul className="mt-2 divide-y divide-line">
            {planet.materials.map((mid) => {
              const m = MATERIALS[mid];
              return (
                <li key={mid} className="py-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-fg">{m.name}</span>
                    <span className="font-mono text-[11px] text-accent">{m.formula}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{m.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-subtle">{k}</dt>
      <dd className="text-fg">{v}</dd>
    </div>
  );
}
