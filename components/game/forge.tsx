"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MATERIALS, RECIPES } from "@/lib/game/data";
import { useGame } from "@/lib/game/store";

export function ForgeScreen() {
  const cargo = useGame((s) => s.cargo);
  const crafted = useGame((s) => s.crafted);
  const craft = useGame((s) => s.craft);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <section>
      <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">ISRU bench</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Forge</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Build ship systems from planetary feedstock. Recipes follow in-situ resource utilization ideas NASA
        already studies — sintered regolith, ice electrolysis, giant-planet scooping, methane/oxygen stages.
      </p>
      <div className="mt-6 grid gap-3">
        {RECIPES.map((recipe) => {
          const built = crafted.includes(recipe.id);
          const ready = recipe.inputs.every((i) => (cargo[i.materialId] ?? 0) >= i.qty);
          return (
            <article
              key={recipe.id}
              className={cn(
                "rounded-xl border bg-surface p-4 sm:p-5",
                built ? "border-ok/40" : "border-line",
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-semibold tracking-tight">{recipe.name}</h2>
                    {built ? (
                      <span className="font-mono text-[10px] tracking-widest text-ok uppercase">online</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-fg/90">{recipe.summary}</p>
                  <p className="mt-2 text-sm text-muted">{recipe.science}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {recipe.inputs.map((i) => {
                      const have = cargo[i.materialId] ?? 0;
                      return (
                        <li
                          key={i.materialId}
                          className={cn(
                            "rounded-sm border px-2 py-1 font-mono text-[11px]",
                            have >= i.qty
                              ? "border-line text-muted"
                              : "border-danger/40 text-danger",
                          )}
                        >
                          {MATERIALS[i.materialId].name} {have}/{i.qty}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Button
                  disabled={built || !ready}
                  onClick={() => setMsg(craft(recipe.id).message)}
                >
                  {built ? "Built" : ready ? "Forge" : "Missing stock"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
      {msg ? <p className="mt-4 text-sm text-muted">{msg}</p> : null}
    </section>
  );
}
