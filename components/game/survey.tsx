"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MATERIALS, PLANETS, planetById, sitesOn } from "@/lib/game/data";
import { hasYield, useGame } from "@/lib/game/store";

export function SurveyScreen() {
  const current = useGame((s) => s.currentPlanet);
  const surveyed = useGame((s) => s.surveyed);
  const survey = useGame((s) => s.survey);
  const collectSite = useGame((s) => s.collectSite);
  const setView = useGame((s) => s.setView);
  const planet = planetById(current);
  const sites = sitesOn(current);
  const [active, setActive] = useState(sites[0]?.id ?? "");
  const site = sites.find((s) => s.id === active) ?? sites[0];
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setActive(sitesOn(current)[0]?.id ?? "");
    setMsg(null);
  }, [current]);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="overflow-hidden rounded-xl border border-line bg-inset">
        <img
          src={planet.image}
          alt={planet.name}
          className="aspect-square w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="space-y-2 p-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
            {planet.access} operations
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">{planet.name}</h1>
          <p className="text-sm leading-relaxed text-muted">{planet.accessNote}</p>
          <dl className="grid grid-cols-2 gap-2 pt-2 font-mono text-[11px] text-subtle">
            <div>
              Gravity
              <div className="text-fg">{planet.gravity}</div>
            </div>
            <div>
              Temperature
              <div className="text-fg">{planet.temp}</div>
            </div>
            <div className="col-span-2">
              Atmosphere
              <div className="text-fg">{planet.atmosphere}</div>
            </div>
          </dl>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Sites</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Survey & extract</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setView("map")}>
            Change planet
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {sites.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "h-11 shrink-0 rounded-md border px-3 text-sm",
                s.id === site?.id
                  ? "border-line-strong bg-elevated text-fg"
                  : "border-line bg-surface text-muted",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
        {site ? (
          <article className="flex flex-1 flex-col rounded-xl border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">{site.name}</h3>
              {site.hazard ? (
                <span className="rounded-sm bg-danger/15 px-2 py-1 font-mono text-[10px] tracking-wide text-danger uppercase">
                  Hazard
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg/90">{site.fact}</p>
            {site.hazard ? <p className="mt-2 text-sm text-danger">{site.hazard}</p> : null}
            <p className="mt-3 font-mono text-[11px] text-subtle">{site.source}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.yields.map((y) => (
                <span
                  key={y.materialId}
                  className="rounded-sm border border-line bg-inset px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {MATERIALS[y.materialId].name} ×{y.qty}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <Button
                variant="secondary"
                disabled={surveyed.includes(site.id)}
                onClick={() => setMsg(survey(site.id).message)}
              >
                {surveyed.includes(site.id) ? "Logged" : "Log survey"}
              </Button>
              <Button
                disabled={!surveyed.includes(site.id) || hasYield(surveyed, site.id)}
                onClick={() => setMsg(collectSite(site.id).message)}
              >
                {hasYield(surveyed, site.id) ? "Exhausted" : "Extract materials"}
              </Button>
            </div>
            {msg ? <p className="mt-3 text-sm text-muted">{msg}</p> : null}
          </article>
        ) : null}
        <p className="text-xs text-subtle">
          You can only extract on {planet.name}. Other worlds:{" "}
          {PLANETS.filter((p) => p.id !== planet.id)
            .map((p) => p.name)
            .join(", ")}
          .
        </p>
      </section>
    </div>
  );
}
