"use client";

import { cn } from "@/lib/utils";
import { MISSIONS } from "@/lib/game/data";
import { useGame } from "@/lib/game/store";

export function TasksScreen() {
  const completed = useGame((s) => s.completed);
  const surveyed = useGame((s) => s.surveyed);
  const crafted = useGame((s) => s.crafted);
  const collected = useGame((s) => s.collected);
  const visited = useGame((s) => s.visited);

  return (
    <section>
      <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Recovery protocol</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Tasks</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Nine beats from wreck to return. Each one teaches a real planetary constraint — ice as fuel, Venus as
        a probe problem, giants as atmospheres you cannot stand on.
      </p>
      <ol className="mt-6 space-y-3">
        {MISSIONS.map((m, i) => {
          const done = completed.includes(m.id);
          const open = !done && m.requires.every((id) => completed.includes(id));
          return (
            <li
              key={m.id}
              className={cn(
                "rounded-xl border p-4",
                done ? "border-ok/30 bg-surface" : open ? "border-line-strong bg-elevated" : "border-line bg-surface/60",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  <span className="mr-2 font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {m.title}
                </h2>
                <span className="font-mono text-[10px] tracking-widest text-subtle uppercase">
                  {done ? "done" : open ? "active" : "queued"}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{m.briefing}</p>
              <p className="mt-2 text-sm text-fg/85">{m.player}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {m.objectives.map((o) => {
                  const ok =
                    o.type === "survey"
                      ? surveyed.includes(o.siteId)
                      : o.type === "craft"
                        ? crafted.includes(o.recipeId)
                        : o.type === "travel"
                          ? visited.includes(o.planetId)
                          : (collected[o.materialId] ?? 0) >= o.qty;
                  return (
                    <li key={o.label} className={cn("font-mono text-[12px]", ok ? "text-ok" : "text-muted")}>
                      {ok ? "■" : "□"} {o.label}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
