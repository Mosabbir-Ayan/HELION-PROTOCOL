"use client";

import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/game/store";

export function StoryScreen() {
  const setView = useGame((s) => s.setView);

  return (
    <main className="star-wash min-h-dvh bg-bg px-6 py-12 text-fg sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Mission 0 · crash</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            HELION-7 is on Mars, not in orbit.
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              A micrometeoroid punched the service module during the Mars capture burn. You rode the lander
              into a hematite plain at dusk. Hull open. Comms dark. Tanks dry.
            </p>
            <p>
              Recovery is a science problem. Every planet in this solar system holds a different inventory —
              iron on Mercury, acid clouds on Venus, copper only on Earth, ice on Mars, hydrogen in the
              giants. NASA already measured them. You will use that list, and no other.
            </p>
            <p>
              Land where there is ground. Probe Venus. Scoop the gas and ice giants from orbit. Craft what
              the wreck is missing. Then go home.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setView("survey")}>
              Step onto the wreck fan
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setView("map")}>
              Inspect the map first
            </Button>
          </div>
        </div>
        <figure className="overflow-hidden rounded-xl border border-line">
          <img
            src="/scenes/crash-mars.jpg"
            alt="HELION-7 wreck on Mars"
            className="aspect-16/10 w-full object-cover"
            crossOrigin="anonymous"
          />
          <figcaption className="bg-surface px-4 py-3 font-mono text-[11px] text-muted">
            Crash site · Acidalia-class plain · Sol 0
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
