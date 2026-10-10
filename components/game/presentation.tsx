"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GAME_DESCRIPTION, MATERIALS, PLANETS, RECIPES } from "@/lib/game/data";

const INTERFACES: {
  id: string;
  title: string;
  kicker: string;
  image: string;
  alt: string;
  player: string;
  notes: string[];
}[] = [
  {
    id: "01",
    title: "Title — the wreck",
    kicker: "Interface 1",
    image: "/briefing/title.jpg",
    alt: "HELION PROTOCOL title screen over the crashed lander on Mars",
    player:
      "You are the commander of HELION-7. The first thing you see is not a menu of planets — it is your ship, torn open on a Martian plain at dusk. You choose to begin the recovery, or to open this project brief. As a player you are already on Mars. Nothing else in the solar system is available yet.",
    notes: [
      "Sets the crash as the only starting location.",
      "Project brief is the presentation deck you are reading now.",
      "No fictional galaxies. The subtitle states the rule: eight planets only.",
    ],
  },
  {
    id: "02",
    title: "Mission story — why you are here",
    kicker: "Interface 2",
    image: "/briefing/story.jpg",
    alt: "Mission briefing describing the Mars crash and recovery protocol",
    player:
      "You read the accident in plain language. A micrometeoroid during Mars capture. Hull open, comms dark, tanks dry. The briefing tells you the method before you touch a tool: land on rock worlds, probe Venus, scoop the giants, craft only from measured materials. You then step onto the wreck fan — or inspect the map first.",
    notes: [
      "Teaches access modes before gameplay: surface, probe, scoop.",
      "Frames recovery as a science problem, not a combat problem.",
    ],
  },
  {
    id: "03",
    title: "Solar map — travel the eight planets",
    kicker: "Interface 3",
    image: "/briefing/map.jpg",
    alt: "Heliocentric map of the eight solar-system planets",
    player:
      "You look along the real order of the solar system, from Mercury to Neptune, with distances in astronomical units. Sizes are not to scale — the same disclaimer NASA uses on public diagrams. Locked worlds stay muted until a task clears them. You select a planet, read what it actually is, and spend fuel to transfer. You cannot fly until you have electrolyzed Martian ice into a hop engine.",
    notes: [
      "Only the eight planets. No exoplanets, no dwarf-planet sandbox.",
      "Fuel cost scales with ΔAU, so Neptune is expensive on purpose.",
      "Saturn’s rings travel with Saturn; they are not a ninth destination.",
    ],
  },
  {
    id: "04",
    title: "Survey — extract what the planet has",
    kicker: "Interface 4",
    image: "/briefing/survey.jpg",
    alt: "Planet survey interface with NASA site notes and extraction",
    player:
      "You work one world at a time. Each site is a real geologic or atmospheric station: a hematite fan, a polar ice scarp, a Venus cloud-deck probe, a Jupiter envelope scoop. You log the survey first — that is the science — then extract. The yield list is the planet’s measured inventory. If the site is toxic (perchlorate, sulfuric acid, 462 °C), the interface says so and will not let you pretend otherwise.",
    notes: [
      "You cannot extract from a planet you have not travelled to.",
      "Venus is a probe. Giants are scoops. No fake solid ground.",
      "Every note cites a NASA or partner instrument.",
    ],
  },
  {
    id: "05",
    title: "Cargo — the hold as a lab notebook",
    kicker: "Interface 5",
    image: "/briefing/cargo.jpg",
    alt: "Cargo hold listing materials with chemical formulas and origin worlds",
    player:
      "You inspect mass, formula, and origin. Hematite is Mars. Copper is Earth. Hydrogen is a giant-planet gas. The hold is not a generic inventory; it is a packing list of solar-system chemistry. As a player you start to see why a hull tile and a radio cannot come from the same rock.",
    notes: [
      "Each entry names every planet known to carry that species.",
      "Perchlorate can sit in the hold as a hazard sample — it is never a life-support ingredient.",
    ],
  },
  {
    id: "06",
    title: "Forge — craft across worlds",
    kicker: "Interface 6",
    image: "/briefing/forge.jpg",
    alt: "ISRU forge listing multi-planet recipes for ship systems",
    player:
      "You build the ship from other people’s planets. A hull from Martian hematite. Propellant from ice. A heat shield that required a Venus probe. A comms array that required Earth’s copper and Mercury’s iron. A cryogenic tank from Jupiter hydrogen, Saturn helium, and ring ice. The return stage burns ice-giant methane with terrestrial oxygen. Missing stock is listed in the open; you go get it.",
    notes: [
      "Recipes follow NASA ISRU logic (sintered regolith, ice electrolysis, CH4/LOX).",
      "You cannot substitute a material the destination does not have.",
    ],
  },
  {
    id: "07",
    title: "Tasks — the recovery protocol",
    kicker: "Interface 7",
    image: "/briefing/tasks.jpg",
    alt: "Nine-step recovery protocol from Mars wreck to return stage",
    player:
      "You follow nine tasks, one unlocked at a time. Survey the wreck. Close the hull. Drink the pole. Make propellant. Call at Earth. Drop a Venus probe. Mine Mercury. Scoop the giants. Finish with methane. Each card tells you what you are doing as a commander and what you are supposed to notice as a student of the solar system.",
    notes: [
      "Inner planets unlock after the hop engine.",
      "Outer planets unlock after comms and power exist — you do not wander the Kuiper belt.",
    ],
  },
  {
    id: "08",
    title: "Atlas — the NASA notebook",
    kicker: "Interface 8",
    image: "/briefing/atlas.jpg",
    alt: "Science atlas of a planet with feedstock and mission sources",
    player:
      "You open the atlas when you want the argument, not the next button. Each planet page lists access mode, temperature, atmosphere, gravity, and every feedstock allowed in the game, with the mission that measured it. If a substance is not on this page, the forge will never ask for it. This is the contract with NASA data.",
    notes: [
      "Sources include MESSENGER, Magellan, Pioneer Venus, Odyssey, MRO, Phoenix, Curiosity, Perseverance, Galileo, Juno, Cassini, Voyager 2.",
      "Figures (AU, radii, gravity) follow NASA Solar System Exploration fact sheets.",
    ],
  },
];

export function Presentation() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="no-print border-b border-line bg-surface/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Project brief</p>
          <div className="flex gap-2">
            <a href="/helion-protocol-brief.pdf" className={buttonVariants({ size: "sm", variant: "primary" })}>
              Download PDF
            </a>
            <Link href="/" className={buttonVariants({ size: "sm", variant: "secondary" })}>
              Play the mission
            </Link>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <header className="brief-page overflow-hidden rounded-xl border border-line">
          <img
            src="/scenes/crash-mars.jpg"
            alt="HELION-7 wrecked on Mars"
            className="aspect-16/7 w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="space-y-3 bg-surface px-6 py-8 sm:px-10">
            <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
              NASA space project · educational mission
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">HELION PROTOCOL</h1>
            <p className="text-lg text-muted">Interface brief for commanders and reviewers</p>
          </div>
        </header>

        <section className="brief-page mt-12">
          <p className="font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">Game description</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">What this mission is</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            {GAME_DESCRIPTION.split("\n\n").map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="brief-page mt-12">
          <p className="font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">Player path</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">How a commander moves</h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-fg">1. Crash on Mars.</span> Survey hematite plains, polar ice, olivine, silica. Learn
              that perchlorate is a poison, not a supply.
            </li>
            <li>
              <span className="text-fg">2. Repair locally.</span> Sinter a hull. Filter ice. Electrolyze the rest into a
              hop engine — the same ISRU idea as MOXIE, extended to fuel.
            </li>
            <li>
              <span className="text-fg">3. Use the map.</span> Earth for copper, silicon, oxygen, water. Venus by probe.
              Mercury for iron-nickel and sulfides.
            </li>
            <li>
              <span className="text-fg">4. Scoop the outer system.</span> Jupiter hydrogen, Saturn helium and ring ice,
              Uranus or Neptune methane. No landing.
            </li>
            <li>
              <span className="text-fg">5. Forge the return stage.</span> Ice-giant methane plus terrestrial oxygen. Go
              home.
            </li>
          </ol>
        </section>

        {INTERFACES.map((plate) => (
          <section key={plate.id} className="brief-page mt-14">
            <p className="font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">{plate.kicker}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{plate.title}</h2>
            <figure className="mt-5 overflow-hidden rounded-xl border border-line bg-inset">
              <img
                src={plate.image}
                alt={plate.alt}
                className="w-full object-cover object-top"
                crossOrigin="anonymous"
              />
            </figure>
            <h3 className="mt-6 text-sm font-medium tracking-wide text-accent uppercase">As a player</h3>
            <p className="mt-2 text-base leading-relaxed text-fg/90">{plate.player}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              {plate.notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="brief-page mt-14">
          <p className="font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">Appendix A</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Materials by planet</h2>
          <p className="mt-3 text-sm text-muted">
            Feedstock is limited to species reported by NASA missions or standard fact sheets. Gas giants have no
            surface sites.
          </p>
          <div className="mt-6 space-y-6">
            {PLANETS.map((p) => (
              <div key={p.id} className="grid gap-4 border-t border-line pt-5 sm:grid-cols-[96px_1fr]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="size-24 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {p.name}{" "}
                    <span className="font-sans text-sm font-normal text-subtle">
                      {p.au} AU · {p.access}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                  <p className="mt-2 font-mono text-[11px] text-subtle">{p.source}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.materials.map((id) => (
                      <li
                        key={id}
                        className="rounded-sm border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {MATERIALS[id].name} · {MATERIALS[id].formula}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="brief-page mt-14">
          <p className="font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">Appendix B</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Forge recipes</h2>
          <ul className="mt-5 divide-y divide-line">
            {RECIPES.map((r) => (
              <li key={r.id} className="py-4">
                <h3 className="text-base font-medium">{r.name}</h3>
                <p className="mt-1 text-sm text-muted">{r.science}</p>
                <p className="mt-2 font-mono text-[11px] text-subtle">
                  {r.inputs.map((i) => `${MATERIALS[i.materialId].name} ×${i.qty}`).join("  +  ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 border-t border-line pt-6 text-sm text-subtle">
          <p>
            HELION PROTOCOL · solar system only · materials after NASA PDS / Solar System Exploration fact sheets and
            the cited flight instruments. Distances and physical data: NASA planet compare.
          </p>
        </footer>
      </article>
    </div>
  );
}
