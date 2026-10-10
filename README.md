# HELION PROTOCOL

**An educational NASA space project: eight planets, no invented worlds.**

HELION PROTOCOL is an educational game set in our solar system. You command survey ship HELION-7 after it crashes on Mars, then use real NASA-measured materials from all eight planets to craft a hull, fuel and return stage and get home. No combat, no invented worlds, only real NASA data.

---

## Features

| Screen | What it does |
| --- | --- |
| **Title** | Starts on the wrecked ship on Mars, the only starting location |
| **Mission story** | Explains the accident and the three access modes: surface, probe, scoop |
| **Solar map** | The real order of the eight planets in AU, with fuel cost based on distance |
| **Survey** | Log a real site, then extract the planet's measured materials |
| **Cargo** | The hold as a lab notebook: formula, mass and origin worlds |
| **Forge** | Craft ship systems from materials of different planets |
| **Tasks** | Nine recovery tasks, unlocked one at a time |
| **Atlas** | NASA-sourced notes on every planet and its allowed feedstock |

## How a commander plays

1. **Crash on Mars.** Survey hematite, ice, olivine and silica. Perchlorate is a poison, not a supply.
2. **Repair locally.** Sinter a hull, filter ice, and electrolyze the rest into a hop engine (the ISRU idea behind MOXIE).
3. **Use the map.** Earth for copper, silicon, oxygen and water. Venus by probe. Mercury for iron-nickel and sulfides.
4. **Scoop the outer system.** Hydrogen from Jupiter, helium and ring ice from Saturn, methane from Uranus or Neptune.
5. **Forge the return stage.** Ice-giant methane plus terrestrial oxygen. Go home.

## Planets and access modes

| Planet | Distance | Access | Key materials |
| --- | --- | --- | --- |
| Mercury | 0.387 AU | Surface | Iron-nickel, sulfides, Mg-Fe silicates, water ice |
| Venus | 0.723 AU | Probe | CO2, sulfuric acid aerosol, basalt, N2 |
| Earth | 1 AU | Surface | Liquid water, O2, N2, copper, carbon, silicon, basalt |
| Mars | 1.524 AU | Surface | Hematite, olivine, hydrated silica, perchlorates, water ice, CO2, basalt |
| Jupiter | 5.203 AU | Scoop | H2, He, NH3 |
| Saturn | 9.537 AU | Scoop | H2, He, CH4, NH3, ring water ice |
| Uranus | 19.191 AU | Scoop | H2, He, CH4 |
| Neptune | 30.069 AU | Scoop | H2, He, CH4 |

## Forge recipes

| Item | Ingredients |
| --- | --- |
| Sintered hull patch | Hematite x2 + Basaltic rock x1 |
| Water-loop cartridge | Water ice x2 + Hydrated silica x1 |
| ISRU hop engine | Water ice x3 |
| Acid-ceramic heat shield | Sulfuric acid aerosol x1 + Basaltic rock x1 + Hydrated silica x1 |
| Deep-space comms array | Copper x2 + Silicon x1 + Iron-nickel metal x1 |
| Metal-sulfide power cell | Iron-nickel metal x2 + Sulfides x2 + Carbon x1 |
| Cryogenic fuel tank | Molecular hydrogen x3 + Helium x2 + Ring water ice x1 |
| Odyssey return stage | Methane x3 + Oxygen x2 + Molecular hydrogen x1 |

---

## Color Reference

| Color | Hex |
| --- | --- |
| background | ![#0A0B0E](https://placehold.co/90x24/0A0B0E/0A0B0E) `#0A0B0E` |
| card | ![#131820](https://placehold.co/90x24/131820/131820) `#131820` |
| accent-blue | ![#8FB0D0](https://placehold.co/90x24/8FB0D0/8FB0D0) `#8FB0D0` |
| accent-orange (Mars) | ![#D0773F](https://placehold.co/90x24/D0773F/D0773F) `#D0773F` |
| text | ![#ECF0F4](https://placehold.co/90x24/ECF0F4/ECF0F4) `#ECF0F4` |
| text-muted | ![#8A94A3](https://placehold.co/90x24/8A94A3/8A94A3) `#8A94A3` |

## Used Variables

```css
:root {
  --background: #0a0b0e;
  --card: #131820;
  --accent-blue: #8fb0d0;
  --accent-orange: #d0773f;
  --text: #ecf0f4;
  --text-muted: #8a94a3;
}
```

---

## Tech Stack

- [Next.js](https://nextjs.org/) with the App Router
- TypeScript
- Tailwind CSS (via PostCSS)

## Getting Started

```bash
# clone the repository
git clone https://github.com/Mosabbir-Ayan/HELION-PROTOCOL.git
cd HELION-PROTOCOL

# install dependencies
npm install

# run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
HELION-PROTOCOL
├── app/          # pages and routes
├── components/   # reusable UI components
├── lib/          # game data and helper logic
├── public/       # images and static assets
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## NASA Data Sources

All materials and figures come from NASA missions and fact sheets.

- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/index.html)
- [Solar System Exploration](https://solarsystem.nasa.gov/planets/overview/)
- [NASA Planetary Data System](https://pds.nasa.gov/datasearch/data-search/)
- [PDS Geosciences Node](https://pds-geosciences.wustl.edu/)
- [MESSENGER (Mercury Orbital Data Explorer)](http://ode.rsl.wustl.edu/mercury/)
- [Magellan data](https://pds-geosciences.wustl.edu/missions/magellan/arcdr/index.htm)
- [Pioneer Venus and Magellan (PDS Atmospheres)](https://pds-atmospheres.nmsu.edu/Venus/venus.html)
- [NASA Earth Observatory](https://earthobservatory.nasa.gov/)
- [USGS National Minerals Information Center](https://www.usgs.gov/centers/national-minerals-information-center)
- Mars: [Odyssey](https://science.nasa.gov/mission/odyssey/), [MRO](https://science.nasa.gov/mission/mars-reconnaissance-orbiter/), [Phoenix](https://science.nasa.gov/mission/phoenix/), [Curiosity](https://science.nasa.gov/mission/msl-curiosity/), [Perseverance](https://science.nasa.gov/mission/mars-2020-perseverance/)
- Outer planets: [Galileo](https://science.nasa.gov/mission/galileo/), [Juno](https://science.nasa.gov/mission/juno/), [Cassini](https://science.nasa.gov/mission/cassini/), [Voyager](https://science.nasa.gov/mission/voyager/)

## Team No Particle

- Arindom Paul (Team Leader)
- Maria Hossain Jotey
- Mosabbir Hossain Ayan
- Sanzida Binta Huq

*Built for the NASA Space Apps Challenge.*
