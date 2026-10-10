"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Crosshair,
  Hammer,
  ListChecks,
  Map,
  Package,
  RotateCcw,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SYSTEMS, planetById, type ViewId } from "@/lib/game/data";
import { activeMission, useGame } from "@/lib/game/store";
import { AtlasScreen } from "./atlas";
import { CargoScreen } from "./cargo";
import { ForgeScreen } from "./forge";
import { SolarMap } from "./solar-map";
import { StoryScreen } from "./story";
import { SurveyScreen } from "./survey";
import { TasksScreen } from "./tasks";

const NAV: { id: ViewId; label: string; icon: typeof Map }[] = [
  { id: "map", label: "Map", icon: Map },
  { id: "survey", label: "Survey", icon: Crosshair },
  { id: "cargo", label: "Cargo", icon: Package },
  { id: "forge", label: "Forge", icon: Hammer },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "atlas", label: "Atlas", icon: BookOpen },
];

const DEMO_VIEWS: ViewId[] = ["title", "story", "map", "survey", "cargo", "forge", "tasks", "atlas"];

export function GameApp() {
  const view = useGame((s) => s.view);
  const hydrated = useGame((s) => s.hydrated);
  const seedDemo = useGame((s) => s.seedDemo);
  const tickTransit = useGame((s) => s.tickTransit);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo") as ViewId | null;
    if (demo && DEMO_VIEWS.includes(demo)) {
      seedDemo(demo);
      return;
    }
    const result = useGame.persist.rehydrate();
    void Promise.resolve(result).then(() => {
      useGame.setState({ hydrated: true });
    });
  }, [seedDemo]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      tickTransit(dt);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [tickTransit]);

  if (!hydrated) {
    return (
      <div className="star-wash flex min-h-dvh items-center justify-center text-sm text-muted">
        Syncing mission state
      </div>
    );
  }

  if (view === "title") return <TitleScreen />;
  if (view === "story") return <StoryScreen />;
  return <OpsShell />;
}

function TitleScreen() {
  const setView = useGame((s) => s.setView);
  const reset = useGame((s) => s.reset);
  const completed = useGame((s) => s.completed);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <img
        src="/scenes/crash-mars.jpg"
        alt="Wreck of HELION-7 on the Martian surface at dusk"
        className="absolute inset-0 h-full w-full object-cover"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-6 py-10 sm:justify-center sm:px-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
          NASA solar system recovery · eight planets only
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-fg sm:text-7xl">
          HELION PROTOCOL
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/85 sm:text-lg">
          Your survey ship is wrecked on Mars. Recover it with materials the planets actually hold —
          measured by NASA missions, not invented for a game.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => setView(completed.length ? "map" : "story")}>
            {completed.length ? "Resume mission" : "Begin recovery"}
          </Button>
          <Link href="/brief" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Project brief
          </Link>
          {completed.length > 0 ? (
            <Button size="lg" variant="ghost" onClick={() => reset()}>
              <RotateCcw className="size-4" />
              New commander
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function OpsShell() {
  const view = useGame((s) => s.view);
  const setView = useGame((s) => s.setView);
  const currentPlanet = useGame((s) => s.currentPlanet);
  const fuel = useGame((s) => s.fuel);
  const systems = useGame((s) => s.systems);
  const completed = useGame((s) => s.completed);
  const transit = useGame((s) => s.transit);
  const won = useGame((s) => s.won);
  const reset = useGame((s) => s.reset);
  const planet = planetById(currentPlanet);
  const mission = activeMission(completed);
  const ready = SYSTEMS.filter((s) => systems[s.id]).length;

  return (
    <div className="star-wash flex min-h-dvh flex-col bg-bg text-fg">
      <header className="border-b border-line bg-bg/90">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          <button type="button" className="shrink-0 text-left" onClick={() => setView("title")}>
            <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">HELION-7</p>
            <p className="font-display text-lg font-semibold leading-none tracking-tight">PROTOCOL</p>
          </button>
          <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex">
            {NAV.map((item) => {
              const Icon = item.icon;
              const on = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={cn(
                    "flex h-10 items-center gap-2 rounded-md px-3 text-sm transition-colors",
                    on ? "bg-elevated text-fg" : "text-muted hover:bg-surface hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-4 font-mono text-[11px] text-muted tabular-nums">
            <span>
              LOC <span className="text-fg">{planet.name}</span>
            </span>
            <span>
              FUEL <span className="text-fg">{fuel}</span>
            </span>
            <span>
              SYS <span className="text-fg">{ready}/8</span>
            </span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-line px-2 py-2 md:hidden">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm",
                  on ? "bg-elevated text-fg" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[1fr_280px] sm:px-6">
        <main className="min-w-0">
          {view === "map" && <SolarMap />}
          {view === "survey" && <SurveyScreen />}
          {view === "cargo" && <CargoScreen />}
          {view === "forge" && <ForgeScreen />}
          {view === "tasks" && <TasksScreen />}
          {view === "atlas" && <AtlasScreen />}
        </main>
        <aside className="flex flex-col gap-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Active task</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
              {won ? "Odyssey complete" : (mission?.title ?? "Stand by")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {won ? "The return stage is stacked. Earth is a transfer away." : mission?.briefing}
            </p>
            {!won && mission ? (
              <ul className="mt-3 space-y-1.5 text-sm text-fg/90">
                {mission.objectives.map((o) => (
                  <li key={o.label} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {o.label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-subtle uppercase">Ship systems</p>
            <ul className="mt-3 space-y-2">
              {SYSTEMS.map((sys) => (
                <li key={sys.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted">{sys.label}</span>
                  <span className={cn("font-mono text-[11px] uppercase", systems[sys.id] ? "text-ok" : "text-subtle")}>
                    {systems[sys.id] ? "online" : "dark"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {transit ? <TransitOverlay /> : null}
      {won ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-fg">
              Return stage is live. You walked the solar system with NASA’s own materials list.
            </p>
            <div className="flex gap-2">
              <Link href="/brief" className={buttonVariants({ variant: "secondary" })}>
                Open brief
              </Link>
              <Button onClick={() => reset()}>Fly it again</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TransitOverlay() {
  const transit = useGame((s) => s.transit);
  const from = useGame((s) => s.currentPlanet);
  if (!transit) return null;
  const dest = planetById(transit.to);
  const origin = planetById(from);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-bg/80 px-6">
      <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-6 shadow-panel">
        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">Transfer</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          {origin.name} → {dest.name}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {dest.au} AU from the Sun · {dest.accessNote}
        </p>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full bg-accent transition-all duration-200"
            style={{ width: `${Math.max(6, (1 - transit.left / 1.15) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

