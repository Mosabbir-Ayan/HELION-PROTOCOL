"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLANETS, SUN, fuelCost, planetById, type PlanetId } from "@/lib/game/data";
import { useGame } from "@/lib/game/store";

export function SolarMap() {
  const current = useGame((s) => s.currentPlanet);
  const selected = useGame((s) => s.selectedPlanet);
  const selectPlanet = useGame((s) => s.selectPlanet);
  const unlocked = useGame((s) => s.unlocked);
  const fuel = useGame((s) => s.fuel);
  const travel = useGame((s) => s.travel);
  const setView = useGame((s) => s.setView);
  const propulsion = useGame((s) => s.systems.propulsion);
  const [msg, setMsg] = useState<string | null>(null);
  const planet = planetById(selected);
  const cost = fuelCost(current, selected);
  const locked = !unlocked.includes(selected);

  return (
    <div className="flex flex-col gap-4">
      <section className="overflow-hidden rounded-xl border border-line bg-inset">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Heliocentric map</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Solar system</h1>
          </div>
          <p className="max-w-xs text-right font-mono text-[10px] text-subtle">
            Distances labeled in AU. Sizes not to scale.
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="flex min-w-[980px] items-end gap-3 px-4 pb-8 pt-6">
            <div className="flex w-24 shrink-0 flex-col items-center gap-3">
              <img
                src={SUN.image}
                alt="The Sun"
                className="size-20 rounded-full object-cover"
                crossOrigin="anonymous"
              />
              <span className="font-mono text-[10px] tracking-widest text-muted uppercase">Sun</span>
            </div>
            {PLANETS.map((p) => {
              const here = p.id === current;
              const on = p.id === selected;
              const isLocked = !unlocked.includes(p.id);
              const size =
                p.id === "jupiter"
                  ? "size-20"
                  : p.id === "saturn"
                    ? "h-16 w-24"
                    : p.id === "uranus" || p.id === "neptune"
                      ? "size-14"
                      : "size-12";
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPlanet(p.id)}
                  className="flex min-w-24 flex-1 flex-col items-center gap-3"
                >
                  <span
                    className={cn(
                      "block h-px w-full bg-line",
                      here && "bg-accent",
                    )}
                  />
                  <img
                    src={p.image}
                    alt={p.name}
                    crossOrigin="anonymous"
                    className={cn(
                      size,
                      "rounded-full object-cover transition-opacity",
                      isLocked && "opacity-40 grayscale",
                      on && "ring-2 ring-accent ring-offset-2 ring-offset-bg",
                    )}
                  />
                  <span className="text-center">
                    <span className={cn("block text-sm", on ? "text-fg" : "text-muted")}>{p.name}</span>
                    <span className="block font-mono text-[10px] text-subtle tabular-nums">{p.au} AU</span>
                    {here ? (
                      <span className="mt-1 block font-mono text-[10px] tracking-widest text-accent uppercase">
                        you
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-xl border border-line bg-surface p-4 md:grid-cols-[160px_1fr_auto] md:items-center">
        <img
          src={planet.image}
          alt={planet.name}
          className="mx-auto size-36 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">
            {planet.type} · {planet.access}
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">{planet.name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{planet.blurb}</p>
          <p className="mt-2 text-xs text-subtle">{planet.source}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            disabled={locked || selected === current || !propulsion}
            onClick={() => {
              const r = travel(selected);
              setMsg(r.message);
            }}
          >
            {selected === current ? "On station" : locked ? "Locked" : `Transfer · ${cost} fuel`}
          </Button>
          <Button variant="secondary" onClick={() => setView("survey")}>
            Open survey
          </Button>
          {msg ? <p className="text-xs text-muted">{msg}</p> : null}
          <p className="font-mono text-[11px] text-subtle">Fuel on board {fuel}</p>
        </div>
      </section>
    </div>
  );
}

export function planetLabel(id: PlanetId) {
  return planetById(id).name;
}
