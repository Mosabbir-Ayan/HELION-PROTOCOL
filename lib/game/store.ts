import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type PlanetId,
  type SystemId,
  type ViewId,
  MISSIONS,
  RECIPES,
  SITES,
  fuelCost,
} from "./data";

export type LogEntry = { t: number; text: string };

export type GameState = {
  hydrated: boolean;
  view: ViewId;
  selectedPlanet: PlanetId;
  currentPlanet: PlanetId;
  unlocked: PlanetId[];
  visited: PlanetId[];
  fuel: number;
  cargo: Record<string, number>;
  collected: Record<string, number>;
  surveyed: string[];
  crafted: string[];
  systems: Record<SystemId, boolean>;
  completed: string[];
  log: LogEntry[];
  transit: null | { to: PlanetId; left: number };
  won: boolean;
};

type Actions = {
  setView: (v: ViewId) => void;
  selectPlanet: (id: PlanetId) => void;
  survey: (siteId: string) => { ok: boolean; message: string };
  collectSite: (siteId: string) => { ok: boolean; message: string };
  craft: (recipeId: string) => { ok: boolean; message: string };
  travel: (to: PlanetId) => { ok: boolean; message: string };
  tickTransit: (dt: number) => void;
  reset: () => void;
  seedDemo: (view: ViewId) => void;
};

const emptySystems = (): Record<SystemId, boolean> => ({
  hull: false,
  lifeSupport: false,
  propulsion: false,
  heatShield: false,
  comms: false,
  power: false,
  cryo: false,
  returnStage: false,
});

const initial = (): Omit<GameState, "hydrated"> => ({
  view: "title",
  selectedPlanet: "mars",
  currentPlanet: "mars",
  unlocked: ["mars"],
  visited: ["mars"],
  fuel: 0,
  cargo: {},
  collected: {},
  surveyed: [],
  crafted: [],
  systems: emptySystems(),
  completed: [],
  log: [
    {
      t: Date.now(),
      text: "HELION-7 down on Mars. Hull breached. Begin recovery protocol.",
    },
  ],
  transit: null,
  won: false,
});

function pushLog(log: LogEntry[], text: string): LogEntry[] {
  return [{ t: Date.now(), text }, ...log].slice(0, 24);
}

function completeMissions(state: GameState): GameState {
  let next = state;
  for (const mission of MISSIONS) {
    if (next.completed.includes(mission.id)) continue;
    if (mission.requires.some((id) => !next.completed.includes(id))) continue;
    const done = mission.objectives.every((obj) => {
      if (obj.type === "survey") return next.surveyed.includes(obj.siteId);
      if (obj.type === "collect") return (next.collected[obj.materialId] ?? 0) >= obj.qty;
      if (obj.type === "craft") return next.crafted.includes(obj.recipeId);
      if (obj.type === "travel") return next.visited.includes(obj.planetId);
      return false;
    });
    if (!done) continue;
    const unlocked = Array.from(new Set([...next.unlocked, ...(mission.unlocks ?? [])]));
    next = {
      ...next,
      completed: [...next.completed, mission.id],
      unlocked,
      fuel: next.fuel + (mission.fuelReward ?? 0),
      log: pushLog(next.log, `Task complete: ${mission.title}`),
      won: mission.id === "m9" ? true : next.won,
    };
  }
  return next;
}

export const useGame = create<GameState & Actions>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...initial(),
      setView: (view) => set({ view }),
      selectPlanet: (id) => set({ selectedPlanet: id }),
      survey: (siteId) => {
        const site = SITES.find((s) => s.id === siteId);
        if (!site) return { ok: false, message: "Unknown site." };
        const s = get();
        if (s.currentPlanet !== site.planetId) {
          return { ok: false, message: "You are not in this planet's operations range." };
        }
        if (s.surveyed.includes(siteId)) {
          return { ok: false, message: "Already logged." };
        }
        set((prev) =>
          completeMissions({
            ...prev,
            surveyed: [...prev.surveyed, siteId],
            log: pushLog(prev.log, `Site logged: ${site.name}`),
          }),
        );
        return { ok: true, message: `Logged ${site.name}.` };
      },
      collectSite: (siteId) => {
        const site = SITES.find((s) => s.id === siteId);
        if (!site) return { ok: false, message: "Unknown site." };
        const s = get();
        if (s.currentPlanet !== site.planetId) {
          return { ok: false, message: "Travel here before extracting." };
        }
        if (!s.surveyed.includes(siteId)) {
          return { ok: false, message: "Survey the site before extraction." };
        }
        const key = `took:${siteId}`;
        if (s.surveyed.includes(key)) {
          return { ok: false, message: "This site is exhausted." };
        }
        set((prev) => {
          const cargo = { ...prev.cargo };
          const collected = { ...prev.collected };
          for (const y of site.yields) {
            cargo[y.materialId] = (cargo[y.materialId] ?? 0) + y.qty;
            collected[y.materialId] = (collected[y.materialId] ?? 0) + y.qty;
          }
          return completeMissions({
            ...prev,
            cargo,
            collected,
            surveyed: [...prev.surveyed, key],
            log: pushLog(prev.log, `Extracted from ${site.name}`),
          });
        });
        return { ok: true, message: `Extracted from ${site.name}.` };
      },
      craft: (recipeId) => {
        const recipe = RECIPES.find((r) => r.id === recipeId);
        if (!recipe) return { ok: false, message: "Unknown recipe." };
        const s = get();
        if (s.crafted.includes(recipeId)) {
          return { ok: false, message: "Already built." };
        }
        for (const input of recipe.inputs) {
          if ((s.cargo[input.materialId] ?? 0) < input.qty) {
            return { ok: false, message: `Need more ${input.materialId}.` };
          }
        }
        set((prev) => {
          const cargo = { ...prev.cargo };
          for (const input of recipe.inputs) {
            cargo[input.materialId] -= input.qty;
          }
          return completeMissions({
            ...prev,
            cargo,
            crafted: [...prev.crafted, recipeId],
            systems: { ...prev.systems, [recipe.system]: true },
            log: pushLog(prev.log, `Forged ${recipe.name}`),
          });
        });
        return { ok: true, message: `Forged ${recipe.name}.` };
      },
      travel: (to) => {
        const s = get();
        if (s.transit) return { ok: false, message: "Already in transit." };
        if (to === s.currentPlanet) return { ok: false, message: "Already on station." };
        if (!s.unlocked.includes(to)) {
          return { ok: false, message: "That transfer is not cleared yet." };
        }
        if (!s.systems.propulsion) {
          return { ok: false, message: "No propulsion. Craft the hop engine first." };
        }
        const cost = fuelCost(s.currentPlanet, to);
        if (s.fuel < cost) {
          return { ok: false, message: `Need ${cost} fuel units.` };
        }
        set({
          fuel: s.fuel - cost,
          transit: { to, left: 1.15 },
          selectedPlanet: to,
          log: pushLog(s.log, `Transfer burn toward ${to}.`),
        });
        return { ok: true, message: `Burning toward ${to}.` };
      },
      tickTransit: (dt) => {
        const s = get();
        if (!s.transit) return;
        const left = s.transit.left - dt;
        if (left > 0) {
          set({ transit: { ...s.transit, left } });
          return;
        }
        const to = s.transit.to;
        set((prev) =>
          completeMissions({
            ...prev,
            transit: null,
            currentPlanet: to,
            selectedPlanet: to,
            visited: prev.visited.includes(to) ? prev.visited : [...prev.visited, to],
            view: "survey",
            log: pushLog(prev.log, `Arrived at ${to}.`),
          }),
        );
      },
      reset: () => set({ ...initial(), hydrated: true }),
      seedDemo: (view) => {
        const current: PlanetId =
          view === "survey"
            ? "mars"
            : view === "map" || view === "forge" || view === "cargo"
              ? "saturn"
              : view === "atlas"
                ? "jupiter"
                : "mars";
        if (view === "title" || view === "story") {
          set({
            ...{
              view,
              selectedPlanet: "mars",
              currentPlanet: "mars",
              unlocked: ["mars"],
              visited: ["mars"],
              fuel: 0,
              cargo: {},
              collected: {},
              surveyed: [],
              crafted: [],
              systems: emptySystems(),
              completed: [],
              log: [
                {
                  t: Date.now(),
                  text: "HELION-7 down on Mars. Hull breached. Begin recovery protocol.",
                },
              ],
              transit: null,
              won: false,
            },
            hydrated: true,
          });
          return;
        }
        set({
          hydrated: true,
          view,
          selectedPlanet: current,
          currentPlanet: current,
          unlocked: ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"],
          visited: ["mars", "earth", "venus", "mercury", "jupiter", "saturn"],
          fuel: 11,
          cargo: {
            hematite: 2,
            basalt: 2,
            water_ice: 2,
            silica: 1,
            copper: 2,
            silicon: 1,
            iron: 3,
            sulfur: 2,
            carbon: 1,
            hydrogen: 4,
            helium: 2,
            ring_ice: 1,
            methane: 2,
            oxygen: 1,
            perchlorate: 2,
            olivine: 2,
          },
          collected: {
            hematite: 2,
            copper: 2,
            silicon: 2,
            iron: 4,
            sulfur: 3,
            hydrogen: 4,
            helium: 2,
          },
          surveyed: [
            "mars-wreck",
            "took:mars-wreck",
            "mars-ice",
            "took:mars-ice",
            "mars-ridge",
            "took:mars-ridge",
            "earth-dock",
            "took:earth-dock",
            "venus-cloud",
            "took:venus-cloud",
            "jupiter-scoop",
            "took:jupiter-scoop",
            "saturn-scoop",
            "saturn-rings",
          ],
          crafted: ["hull-patch", "life-cart", "isru-thruster", "heat-tile", "comms", "power-cell"],
          systems: {
            hull: true,
            lifeSupport: true,
            propulsion: true,
            heatShield: true,
            comms: true,
            power: true,
            cryo: false,
            returnStage: false,
          },
          completed: ["m1", "m2", "m3", "m4", "m5", "m6", "m7"],
          log: [
            { t: Date.now(), text: "Cassini-class skim of the A ring in progress." },
            { t: Date.now() - 1000, text: "Jupiter scoop complete. Hydrogen in tanks." },
            { t: Date.now() - 2000, text: "Comms array online." },
          ],
          transit: null,
          won: false,
        });
      },
    }),
    {
      name: "helion-protocol-v1",
      skipHydration: true,
      partialize: (s) => ({
        view: s.view === "title" ? "title" : s.view,
        selectedPlanet: s.selectedPlanet,
        currentPlanet: s.currentPlanet,
        unlocked: s.unlocked,
        visited: s.visited,
        fuel: s.fuel,
        cargo: s.cargo,
        collected: s.collected,
        surveyed: s.surveyed,
        crafted: s.crafted,
        systems: s.systems,
        completed: s.completed,
        log: s.log,
        transit: null,
        won: s.won,
      }),
    },
  ),
);

export function hasYield(surveyed: string[], siteId: string) {
  return surveyed.includes(`took:${siteId}`);
}

export function activeMission(completed: string[]) {
  return (
    MISSIONS.find((m) => !completed.includes(m.id) && m.requires.every((id) => completed.includes(id))) ?? null
  );
}
