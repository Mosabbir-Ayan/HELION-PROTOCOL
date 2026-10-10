export type PlanetId =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type Access = "surface" | "probe" | "scoop";
export type SystemId =
  | "hull"
  | "lifeSupport"
  | "propulsion"
  | "heatShield"
  | "comms"
  | "power"
  | "cryo"
  | "returnStage";

export type ViewId =
  | "title"
  | "story"
  | "map"
  | "survey"
  | "cargo"
  | "forge"
  | "tasks"
  | "atlas";

export type Material = {
  id: string;
  name: string;
  formula: string;
  kind: "metal" | "rock" | "volatile" | "ice" | "atmosphere";
  description: string;
};

export type Planet = {
  id: PlanetId;
  name: string;
  order: number;
  au: number;
  radiusKm: number;
  gravity: string;
  type: string;
  access: Access;
  accessNote: string;
  temp: string;
  atmosphere: string;
  image: string;
  blurb: string;
  source: string;
  materials: string[];
};

export type Site = {
  id: string;
  planetId: PlanetId;
  name: string;
  yields: { materialId: string; qty: number }[];
  fact: string;
  source: string;
  hazard?: string;
};

export type Recipe = {
  id: string;
  name: string;
  system: SystemId;
  summary: string;
  science: string;
  inputs: { materialId: string; qty: number }[];
};

export type Mission = {
  id: string;
  title: string;
  briefing: string;
  player: string;
  requires: string[];
  objectives: Objective[];
  unlocks?: PlanetId[];
  fuelReward?: number;
};

export type Objective =
  | { type: "survey"; siteId: string; label: string }
  | { type: "collect"; materialId: string; qty: number; label: string }
  | { type: "craft"; recipeId: string; label: string }
  | { type: "travel"; planetId: PlanetId; label: string };

export const MATERIALS: Record<string, Material> = {
  iron: {
    id: "iron",
    name: "Iron-nickel metal",
    formula: "Fe-Ni",
    kind: "metal",
    description:
      "Metallic iron with nickel, the dominant bulk constituent of Mercury and a core-forming metal throughout the inner solar system.",
  },
  sulfur: {
    id: "sulfur",
    name: "Sulfides",
    formula: "S / FeS",
    kind: "rock",
    description:
      "Sulfur-bearing minerals mapped on Mercury by MESSENGER and present in Venus cloud chemistry as sulfuric acid precursors.",
  },
  silicate: {
    id: "silicate",
    name: "Magnesium silicates",
    formula: "Mg-Fe silicates",
    kind: "rock",
    description:
      "Olivine and pyroxene-family silicates that make up most rocky crusts and mantles of the terrestrial planets.",
  },
  water_ice: {
    id: "water_ice",
    name: "Water ice",
    formula: "H2O (s)",
    kind: "ice",
    description:
      "Frozen water confirmed in Mercury polar craters and in the Martian poles and shallow subsurface.",
  },
  liquid_water: {
    id: "liquid_water",
    name: "Liquid water",
    formula: "H2O (l)",
    kind: "volatile",
    description:
      "Stable surface water exists in the solar system only on Earth, the baseline for life support and ISRU.",
  },
  co2: {
    id: "co2",
    name: "Carbon dioxide",
    formula: "CO2",
    kind: "atmosphere",
    description:
      "The principal gas of the Venus and Mars atmospheres, and the dry-ice component of the Martian polar caps.",
  },
  h2so4: {
    id: "h2so4",
    name: "Sulfuric acid aerosol",
    formula: "H2SO4",
    kind: "atmosphere",
    description:
      "The concentrated acid droplets that form Venus's cloud decks, measured by Pioneer Venus and later probes.",
  },
  basalt: {
    id: "basalt",
    name: "Basaltic rock",
    formula: "Si-Fe-Mg-Al-Ca",
    kind: "rock",
    description:
      "The most common volcanic crust on Venus, Earth, and Mars — tholeiitic basalt sampled by Venera, terrestrial geology, and Mars rovers.",
  },
  nitrogen: {
    id: "nitrogen",
    name: "Nitrogen",
    formula: "N2",
    kind: "atmosphere",
    description:
      "The majority gas of Earth's air and a few percent of the Venus atmosphere. Buffer gas for habitat air.",
  },
  oxygen: {
    id: "oxygen",
    name: "Oxygen",
    formula: "O2",
    kind: "atmosphere",
    description:
      "Free oxygen is unique to Earth's biosphere among solar-system planets. Essential for crew air and oxidizer.",
  },
  copper: {
    id: "copper",
    name: "Copper",
    formula: "Cu",
    kind: "metal",
    description:
      "A conductive crustal metal abundant in Earth's ore deposits. No comparable copper ore has been confirmed on other planets.",
  },
  carbon: {
    id: "carbon",
    name: "Carbon / organics",
    formula: "C",
    kind: "volatile",
    description:
      "Graphite, carbonates, and organic carbon. Earth is the only planet with a surface carbon cycle and abundant biomass carbon.",
  },
  silicon: {
    id: "silicon",
    name: "Silicon",
    formula: "Si",
    kind: "rock",
    description:
      "The backbone of crustal silicates and semiconductor wafers. Refined most readily from Earth's industrial geology.",
  },
  hematite: {
    id: "hematite",
    name: "Hematite",
    formula: "Fe2O3",
    kind: "rock",
    description:
      "Iron oxide that tints Mars red. Mapped from orbit (TES, CRISM) and identified in situ by Opportunity and Curiosity CheMin.",
  },
  perchlorate: {
    id: "perchlorate",
    name: "Perchlorate salts",
    formula: "ClO4-",
    kind: "rock",
    description:
      "Oxidizing chlorine salts discovered in Martian soil by Phoenix. A toxic hazard for crews, not a life-support feedstock.",
  },
  olivine: {
    id: "olivine",
    name: "Olivine",
    formula: "(Mg,Fe)2SiO4",
    kind: "rock",
    description:
      "A primary igneous mineral in the Martian crust, confirmed by CRISM spectroscopy and CheMin X-ray diffraction.",
  },
  silica: {
    id: "silica",
    name: "Hydrated silica",
    formula: "SiO2 · nH2O",
    kind: "rock",
    description:
      "Opaline silica and related phases found by Spirit in Gusev crater, evidence of past water-rock interaction on Mars.",
  },
  hydrogen: {
    id: "hydrogen",
    name: "Molecular hydrogen",
    formula: "H2",
    kind: "atmosphere",
    description:
      "About 90 percent of Jupiter and the leading gas of Saturn, Uranus, and Neptune. Harvested only by atmospheric scooping.",
  },
  helium: {
    id: "helium",
    name: "Helium",
    formula: "He",
    kind: "atmosphere",
    description:
      "The second gas of the giant planets (~10% of Jupiter). Cassini and Galileo measured mixing ratios in situ.",
  },
  ammonia: {
    id: "ammonia",
    name: "Ammonia",
    formula: "NH3",
    kind: "volatile",
    description:
      "Condenses into Jupiter and Saturn's upper cloud decks. Detected by Galileo, Juno, and Cassini.",
  },
  methane: {
    id: "methane",
    name: "Methane",
    formula: "CH4",
    kind: "volatile",
    description:
      "The absorber that tints Uranus and Neptune blue-green. Also a trace/upper-atmosphere species at Saturn.",
  },
  ring_ice: {
    id: "ring_ice",
    name: "Ring water ice",
    formula: "H2O (s)",
    kind: "ice",
    description:
      "Saturn's rings are overwhelmingly water ice with a small dark contaminant, as shown by Cassini VIMS and CDA.",
  },
};

export const PLANETS: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    order: 1,
    au: 0.387,
    radiusKm: 2439.7,
    gravity: "3.70 m/s²",
    type: "Terrestrial",
    access: "surface",
    accessNote: "Airless surface EVA. Extreme day-night swing.",
    temp: "−173 to 427 °C",
    atmosphere: "Exosphere (Na, Ca, Mg)",
    image: "/planets/mercury.jpg",
    blurb:
      "A metal-rich world. MESSENGER found a bulk iron fraction far higher than Earth's, sulfur-rich surface chemistry, and water ice in permanently shadowed polar craters.",
    source: "NASA MESSENGER XRS/GRS; Arecibo & MESSENGER polar ice",
    materials: ["iron", "sulfur", "silicate", "water_ice"],
  },
  {
    id: "venus",
    name: "Venus",
    order: 2,
    au: 0.723,
    radiusKm: 6051.8,
    gravity: "8.87 m/s²",
    type: "Terrestrial",
    access: "probe",
    accessNote: "Surface is 462 °C and ~92 bar. Deploy a short-lived probe; do not land the ship.",
    temp: "462 °C (surface)",
    atmosphere: "CO2 96.5%, N2 3.5%, H2SO4 clouds",
    image: "/planets/venus.jpg",
    blurb:
      "A runaway greenhouse. Pioneer Venus and Magellan mapped a dense CO2 envelope, sulfuric acid clouds, and a basaltic volcanic crust.",
    source: "NASA Pioneer Venus; Magellan; Venera lander chemistry",
    materials: ["co2", "h2so4", "basalt", "nitrogen"],
  },
  {
    id: "earth",
    name: "Earth",
    order: 3,
    au: 1,
    radiusKm: 6371,
    gravity: "9.81 m/s²",
    type: "Terrestrial",
    access: "surface",
    accessNote: "Only planet with liquid water, free oxygen, and industrial metals in ore form.",
    temp: "−88 to 58 °C",
    atmosphere: "N2 78%, O2 21%, Ar, CO2",
    image: "/planets/earth.jpg",
    blurb:
      "The reference habitable world. Unique in the solar system for oceans, a biosphere, and refined crustal metals such as copper.",
    source: "NASA Earth Observatory; USGS crustal abundances",
    materials: ["liquid_water", "oxygen", "nitrogen", "copper", "carbon", "silicon", "basalt"],
  },
  {
    id: "mars",
    name: "Mars",
    order: 4,
    au: 1.524,
    radiusKm: 3389.5,
    gravity: "3.71 m/s²",
    type: "Terrestrial",
    access: "surface",
    accessNote: "Thin CO2 air. Dust, cold, and perchlorate soils. Polar ice is the local water source.",
    temp: "−153 to 20 °C",
    atmosphere: "CO2 95%, N2, Ar",
    image: "/planets/mars.jpg",
    blurb:
      "The crash world. Iron oxides stain the dust. Rovers and orbiters have catalogued hematite, olivine, hydrated silica, perchlorates, and water ice.",
    source: "NASA Odyssey, MRO, Phoenix, Curiosity CheMin, Perseverance",
    materials: ["hematite", "olivine", "silica", "perchlorate", "water_ice", "co2", "basalt"],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    order: 5,
    au: 5.203,
    radiusKm: 69911,
    gravity: "24.79 m/s²",
    type: "Gas giant",
    access: "scoop",
    accessNote: "No solid surface. Hold orbit and scoop the upper atmosphere.",
    temp: "−108 °C at 1 bar",
    atmosphere: "H2 ~90%, He ~10%, NH3 clouds",
    image: "/planets/jupiter.jpg",
    blurb:
      "A failed star of hydrogen and helium. Galileo's probe and Juno measured the envelope that you can harvest only from orbit.",
    source: "NASA Galileo Probe; Juno",
    materials: ["hydrogen", "helium", "ammonia"],
  },
  {
    id: "saturn",
    name: "Saturn",
    order: 6,
    au: 9.537,
    radiusKm: 58232,
    gravity: "10.4 m/s²",
    type: "Gas giant",
    access: "scoop",
    accessNote: "No solid surface. Scoop atmosphere; skim ring-ice particles from the ring plane.",
    temp: "−139 °C at 1 bar",
    atmosphere: "H2, He, CH4, NH3",
    image: "/planets/saturn.jpg",
    blurb:
      "Hydrogen-helium envelope plus the solar system's ice-particle rings. Cassini spent thirteen years measuring both.",
    source: "NASA Cassini",
    materials: ["hydrogen", "helium", "methane", "ammonia", "ring_ice"],
  },
  {
    id: "uranus",
    name: "Uranus",
    order: 7,
    au: 19.191,
    radiusKm: 25362,
    gravity: "8.87 m/s²",
    type: "Ice giant",
    access: "scoop",
    accessNote: "No solid surface. Methane-rich envelope over a water-ammonia ice mantle.",
    temp: "−197 °C at 1 bar",
    atmosphere: "H2, He, CH4",
    image: "/planets/uranus.jpg",
    blurb:
      "An ice giant. Methane absorbs red light and leaves the pale cyan color Voyager 2 recorded in 1986.",
    source: "NASA Voyager 2",
    materials: ["hydrogen", "helium", "methane"],
  },
  {
    id: "neptune",
    name: "Neptune",
    order: 8,
    au: 30.069,
    radiusKm: 24622,
    gravity: "11.15 m/s²",
    type: "Ice giant",
    access: "scoop",
    accessNote: "No solid surface. Deepest well in the system; scoop and leave.",
    temp: "−201 °C at 1 bar",
    atmosphere: "H2, He, CH4",
    image: "/planets/neptune.jpg",
    blurb:
      "The farthest planet. Voyager 2 found an active methane-stained atmosphere and the highest winds measured in the solar system.",
    source: "NASA Voyager 2",
    materials: ["hydrogen", "helium", "methane"],
  },
];

export const SITES: Site[] = [
  {
    id: "mars-wreck",
    planetId: "mars",
    name: "HELION-7 wreck fan",
    yields: [
      { materialId: "hematite", qty: 2 },
      { materialId: "basalt", qty: 1 },
    ],
    fact: "The lander sits on a hematite-stained basaltic plain typical of Meridiani-class terrain. Opportunity showed such spherules and outcrops are iron oxide, not soil dye alone.",
    source: "NASA MER Opportunity; MGS TES hematite maps",
  },
  {
    id: "mars-ridge",
    planetId: "mars",
    name: "Olivine ridge",
    yields: [
      { materialId: "olivine", qty: 2 },
      { materialId: "silica", qty: 1 },
    ],
    fact: "CRISM and CheMin both find olivine in minimally weathered Martian igneous rock. Nearby hydrated silica records ancient water-rock interaction.",
    source: "NASA MRO CRISM; MSL CheMin; MER Spirit",
  },
  {
    id: "mars-ice",
    planetId: "mars",
    name: "Polar ice scarp",
    yields: [
      { materialId: "water_ice", qty: 5 },
      { materialId: "co2", qty: 1 },
    ],
    fact: "Phoenix and Odyssey's neutron spectrometer confirmed water ice in the high-latitude subsurface. Seasonal CO2 frost caps the poles.",
    source: "NASA Phoenix; Mars Odyssey NS",
  },
  {
    id: "mars-soil",
    planetId: "mars",
    name: "Perchlorate flats",
    yields: [{ materialId: "perchlorate", qty: 2 }],
    fact: "Phoenix Wet Chemistry Lab found perchlorate salts in polar soil. They are useful oxidizers in principle and toxic to unshielded biology in practice.",
    source: "NASA Phoenix MECA",
    hazard: "Toxic oxidizer. Do not route into life support.",
  },
  {
    id: "earth-dock",
    planetId: "earth",
    name: "Coastal salvage yard",
    yields: [
      { materialId: "copper", qty: 2 },
      { materialId: "silicon", qty: 2 },
      { materialId: "carbon", qty: 2 },
    ],
    fact: "Earth is the only planet with concentrated copper ores, semiconductor-grade silicon infrastructure, and a surface carbon cycle.",
    source: "USGS; NASA Earth Observatory",
  },
  {
    id: "earth-ocean",
    planetId: "earth",
    name: "Open ocean intake",
    yields: [
      { materialId: "liquid_water", qty: 3 },
      { materialId: "oxygen", qty: 2 },
      { materialId: "nitrogen", qty: 2 },
    ],
    fact: "Liquid water and a 21% oxygen atmosphere exist on no other solar-system planet. This is the only place to refill crew air without electrolysis.",
    source: "NASA Earth fact sheet",
  },
  {
    id: "earth-basalt",
    planetId: "earth",
    name: "Flood-basalt quarry",
    yields: [{ materialId: "basalt", qty: 2 }],
    fact: "Terrestrial flood basalts are compositional cousins of Venusian and Martian volcanic crust — a calibration sample for the other worlds.",
    source: "NASA / USGS terrestrial analogs",
  },
  {
    id: "mercury-plain",
    planetId: "mercury",
    name: "Caloris ejecta",
    yields: [
      { materialId: "iron", qty: 3 },
      { materialId: "silicate", qty: 1 },
    ],
    fact: "MESSENGER X-ray spectrometry found a surface and bulk composition unusually rich in iron and sulfur compared with the other terrestrial planets.",
    source: "NASA MESSENGER XRS",
  },
  {
    id: "mercury-sulfide",
    planetId: "mercury",
    name: "Hollows terrace",
    yields: [
      { materialId: "sulfur", qty: 3 },
      { materialId: "iron", qty: 1 },
    ],
    fact: "Mercury's hollows and high sulfur abundance point to volatile-rich crustal sulfides, a chemistry MESSENGER did not expect from formation models.",
    source: "NASA MESSENGER MASCS / XRS",
  },
  {
    id: "mercury-pole",
    planetId: "mercury",
    name: "Polar shadowed crater",
    yields: [{ materialId: "water_ice", qty: 2 }],
    fact: "Radar-bright deposits in permanently shadowed polar craters are water ice, confirmed by MESSENGER neutron, reflectance, and thermal data.",
    source: "NASA MESSENGER; Arecibo radar",
  },
  {
    id: "venus-cloud",
    planetId: "venus",
    name: "Cloud-deck probe",
    yields: [
      { materialId: "h2so4", qty: 2 },
      { materialId: "co2", qty: 2 },
    ],
    fact: "Between about 50–70 km the Venus clouds are concentrated sulfuric acid aerosols in a CO2 atmosphere. Pioneer Venus measured the droplet chemistry.",
    source: "NASA Pioneer Venus",
    hazard: "Corrosive acid clouds.",
  },
  {
    id: "venus-surface",
    planetId: "venus",
    name: "Venera-class drop",
    yields: [
      { materialId: "basalt", qty: 2 },
      { materialId: "nitrogen", qty: 1 },
    ],
    fact: "Venera landers lasted under two hours on a 462 °C basaltic surface. Magellan radar later showed a world of volcanic plains.",
    source: "Venera XRF; NASA Magellan",
    hazard: "92 bar, 462 °C. Probe is expendable.",
  },
  {
    id: "jupiter-scoop",
    planetId: "jupiter",
    name: "Upper envelope scoop",
    yields: [
      { materialId: "hydrogen", qty: 4 },
      { materialId: "helium", qty: 2 },
    ],
    fact: "The Galileo probe descended into an H2-He envelope. Juno continues to refine the helium abundance and deep ammonia structure.",
    source: "NASA Galileo Probe; Juno",
  },
  {
    id: "jupiter-cloud",
    planetId: "jupiter",
    name: "Ammonia cloud belt",
    yields: [{ materialId: "ammonia", qty: 2 }],
    fact: "Jupiter's visible belts and zones are ammonia ice clouds over deeper water and hydrosulfide layers.",
    source: "NASA Juno MWR; Galileo",
  },
  {
    id: "saturn-scoop",
    planetId: "saturn",
    name: "Equatorial scoop",
    yields: [
      { materialId: "hydrogen", qty: 3 },
      { materialId: "helium", qty: 2 },
      { materialId: "methane", qty: 1 },
    ],
    fact: "Cassini's INMS and CIRS measured Saturn's H2-He envelope and hydrocarbon traces during the Grand Finale orbits.",
    source: "NASA Cassini",
  },
  {
    id: "saturn-rings",
    planetId: "saturn",
    name: "A-ring ice skim",
    yields: [{ materialId: "ring_ice", qty: 3 }],
    fact: "VIMS spectra show Saturn's rings are >90% water ice. They are a planetary structure, not a separate world.",
    source: "NASA Cassini VIMS / CDA",
  },
  {
    id: "uranus-scoop",
    planetId: "uranus",
    name: "Methane envelope scoop",
    yields: [
      { materialId: "hydrogen", qty: 2 },
      { materialId: "methane", qty: 3 },
      { materialId: "helium", qty: 1 },
    ],
    fact: "Voyager 2 is still the only spacecraft to visit Uranus. Methane in the upper atmosphere produces the cyan color.",
    source: "NASA Voyager 2",
  },
  {
    id: "neptune-scoop",
    planetId: "neptune",
    name: "Great Dark Spot track",
    yields: [
      { materialId: "hydrogen", qty: 2 },
      { materialId: "methane", qty: 3 },
      { materialId: "helium", qty: 1 },
    ],
    fact: "Voyager 2 found methane-rich, vigorously stormy weather on the farthest planet — the last of the eight.",
    source: "NASA Voyager 2",
  },
];

export const RECIPES: Recipe[] = [
  {
    id: "hull-patch",
    name: "Sintered hull patch",
    system: "hull",
    summary: "Fire hematite and basalt into a ceramic-metal skin for the torn lander.",
    science:
      "Mars ISRU studies treat iron-oxide dust and basaltic regolith as feedstock for sintered tiles and metal extraction.",
    inputs: [
      { materialId: "hematite", qty: 2 },
      { materialId: "basalt", qty: 1 },
    ],
  },
  {
    id: "life-cart",
    name: "Water-loop cartridge",
    system: "lifeSupport",
    summary: "Melt polar ice and filter it through hydrated silica. Do not admit perchlorate.",
    science:
      "Phoenix and Odyssey proved the ice. Spirit's silica is a natural filter analog. Perchlorate remains a contamination hazard.",
    inputs: [
      { materialId: "water_ice", qty: 2 },
      { materialId: "silica", qty: 1 },
    ],
  },
  {
    id: "isru-thruster",
    name: "ISRU hop engine",
    system: "propulsion",
    summary: "Electrolyze Martian water ice into hydrogen and oxygen bipropellant.",
    science:
      "NASA ISRU roadmaps (MOXIE is the oxygen half) treat water ice as the local propellant source for Mars ascent and short transfers.",
    inputs: [{ materialId: "water_ice", qty: 3 }],
  },
  {
    id: "heat-tile",
    name: "Acid-ceramic heat shield",
    system: "heatShield",
    summary: "Bind Venus sulfuric products into a high-temperature ceramic over basalt cloth.",
    science:
      "Venus aerobot studies treat the cloud deck as a chemistry lab. The 462 °C surface forces a shield before any inner-planet aerocapture.",
    inputs: [
      { materialId: "h2so4", qty: 1 },
      { materialId: "basalt", qty: 1 },
      { materialId: "silica", qty: 1 },
    ],
  },
  {
    id: "comms",
    name: "Deep-space comms array",
    system: "comms",
    summary: "Draw copper and silicon from Earth, structure from Mercury iron.",
    science:
      "Copper conductors and silicon electronics have no demonstrated ore-grade source on Mars. Earth remains the industrial node of the system.",
    inputs: [
      { materialId: "copper", qty: 2 },
      { materialId: "silicon", qty: 1 },
      { materialId: "iron", qty: 1 },
    ],
  },
  {
    id: "power-cell",
    name: "Metal-sulfide power cell",
    system: "power",
    summary: "Pair Mercury iron-nickel with sulfides and Earth carbon for a high-density cell.",
    science:
      "MESSENGER's Fe-S chemistry is a natural battery analog. Carbon from Earth completes the electrode set.",
    inputs: [
      { materialId: "iron", qty: 2 },
      { materialId: "sulfur", qty: 2 },
      { materialId: "carbon", qty: 1 },
    ],
  },
  {
    id: "cryo-tank",
    name: "Cryogenic fuel tank",
    system: "cryo",
    summary: "Liquefy scooped hydrogen and helium inside a ring-ice-cooled tank.",
    science:
      "Giant-planet envelopes are the solar system's hydrogen well. Saturn ring ice is a convenient cryogenic heat sink.",
    inputs: [
      { materialId: "hydrogen", qty: 3 },
      { materialId: "helium", qty: 2 },
      { materialId: "ring_ice", qty: 1 },
    ],
  },
  {
    id: "return-stage",
    name: "Odyssey return stage",
    system: "returnStage",
    summary: "Methane from the ice giants plus oxygen from Earth, on a powered, shielded hull.",
    science:
      "A methane/oxygen stage is a NASA-relevant architecture (see Raptor-class CH4/LOX). The methane here is planetary, not drilled.",
    inputs: [
      { materialId: "methane", qty: 3 },
      { materialId: "oxygen", qty: 2 },
      { materialId: "hydrogen", qty: 1 },
    ],
  },
];

export const MISSIONS: Mission[] = [
  {
    id: "m1",
    title: "Survey the wreck",
    briefing: "HELION-7 is down on Mars. Walk the fan, sample the oxide dust, and log the site.",
    player: "You step onto rust-colored basalt and take the first scientific sample of the mission.",
    requires: [],
    objectives: [
      { type: "survey", siteId: "mars-wreck", label: "Survey the wreck fan" },
      { type: "collect", materialId: "hematite", qty: 2, label: "Collect 2 hematite" },
    ],
  },
  {
    id: "m2",
    title: "Close the hull",
    briefing: "Sinter a patch from local iron oxide and basalt before the next dust storm.",
    player: "You fire Martian dust into a tile and bolt it over the torn skin.",
    requires: ["m1"],
    objectives: [{ type: "craft", recipeId: "hull-patch", label: "Craft the hull patch" }],
  },
  {
    id: "m3",
    title: "Drink the pole",
    briefing: "Drive the scarp for ice, then the ridge for silica. Melt, filter, keep perchlorate out of the loop.",
    player: "You learn that Mars has water — frozen — and that some of its salts are poison.",
    requires: ["m2"],
    objectives: [
      { type: "survey", siteId: "mars-ice", label: "Survey the polar ice scarp" },
      { type: "survey", siteId: "mars-ridge", label: "Survey the olivine ridge" },
      { type: "craft", recipeId: "life-cart", label: "Craft the water-loop cartridge" },
    ],
  },
  {
    id: "m4",
    title: "Make propellant",
    briefing: "Electrolyze the remaining ice into a hop engine. This is how you leave Mars.",
    player: "You split water into hydrogen and oxygen — the same ISRU idea behind MOXIE, extended to fuel.",
    requires: ["m3"],
    objectives: [{ type: "craft", recipeId: "isru-thruster", label: "Craft the ISRU hop engine" }],
    unlocks: ["earth", "venus", "mercury"],
    fuelReward: 8,
  },
  {
    id: "m5",
    title: "Call at Earth",
    briefing: "Earth is the industrial planet. You need copper and silicon that Mars does not mine.",
    player: "You leave Mars, cross 0.5 AU, and stand again in air you can breathe.",
    requires: ["m4"],
    objectives: [
      { type: "travel", planetId: "earth", label: "Travel to Earth" },
      { type: "collect", materialId: "copper", qty: 2, label: "Collect 2 copper" },
      { type: "collect", materialId: "silicon", qty: 1, label: "Collect 1 silicon" },
    ],
  },
  {
    id: "m6",
    title: "Drop a Venus probe",
    briefing: "You cannot land. Drop a probe into the cloud deck and the basaltic surface, then leave.",
    player: "You watch a probe vanish into sulfuric clouds and understand why Venus is not a second Earth.",
    requires: ["m5"],
    objectives: [
      { type: "travel", planetId: "venus", label: "Travel to Venus" },
      { type: "survey", siteId: "venus-cloud", label: "Deploy the cloud-deck probe" },
      { type: "craft", recipeId: "heat-tile", label: "Craft the heat shield" },
    ],
  },
  {
    id: "m7",
    title: "Mine the iron planet",
    briefing: "Mercury is the metal well of the inner system. Take iron and sulfur for the power cell and the comms mast.",
    player: "You EVA on an airless, iron-rich world closer to the Sun than anything else you will visit.",
    requires: ["m6"],
    objectives: [
      { type: "travel", planetId: "mercury", label: "Travel to Mercury" },
      { type: "collect", materialId: "iron", qty: 3, label: "Collect 3 iron-nickel" },
      { type: "collect", materialId: "sulfur", qty: 2, label: "Collect 2 sulfides" },
      { type: "craft", recipeId: "comms", label: "Craft the comms array" },
      { type: "craft", recipeId: "power-cell", label: "Craft the power cell" },
    ],
    unlocks: ["jupiter", "saturn", "uranus", "neptune"],
    fuelReward: 6,
  },
  {
    id: "m8",
    title: "Scoop the giants",
    briefing: "No landing. Orbit Jupiter for hydrogen, Saturn for helium and ring ice, then tank it cryogenically.",
    player: "You fly past the asteroid belt and harvest an atmosphere instead of a rock.",
    requires: ["m7"],
    objectives: [
      { type: "travel", planetId: "jupiter", label: "Travel to Jupiter" },
      { type: "travel", planetId: "saturn", label: "Travel to Saturn" },
      { type: "craft", recipeId: "cryo-tank", label: "Craft the cryogenic tank" },
    ],
  },
  {
    id: "m9",
    title: "Methane from the ice",
    briefing: "Uranus or Neptune will give you methane. Earth still owes you oxygen. Then you can go home.",
    player: "You finish the solar system at the ice giants, the only planets Voyager 2 ever saw up close.",
    requires: ["m8"],
    objectives: [
      { type: "collect", materialId: "methane", qty: 3, label: "Collect 3 methane" },
      { type: "collect", materialId: "oxygen", qty: 2, label: "Collect 2 oxygen" },
      { type: "craft", recipeId: "return-stage", label: "Craft the Odyssey return stage" },
    ],
  },
];

export const SYSTEMS: { id: SystemId; label: string }[] = [
  { id: "hull", label: "Hull" },
  { id: "lifeSupport", label: "Life support" },
  { id: "propulsion", label: "Propulsion" },
  { id: "heatShield", label: "Heat shield" },
  { id: "comms", label: "Comms" },
  { id: "power", label: "Power" },
  { id: "cryo", label: "Cryo tank" },
  { id: "returnStage", label: "Return stage" },
];

export const SUN = {
  name: "Sun",
  image: "/planets/sun.jpg",
  note: "G2V star. Not visitable. Distances below are heliocentric and not to scale.",
};

export function planetById(id: PlanetId) {
  return PLANETS.find((p) => p.id === id)!;
}

export function sitesOn(id: PlanetId) {
  return SITES.filter((s) => s.planetId === id);
}

export function fuelCost(from: PlanetId, to: PlanetId) {
  if (from === to) return 0;
  const a = planetById(from).au;
  const b = planetById(to).au;
  return Math.max(1, Math.ceil(Math.abs(a - b) * 1.35));
}

export const GAME_DESCRIPTION = `HELION PROTOCOL is an educational recovery mission set only in our solar system. You command survey vessel HELION-7 after it comes down on Mars. There is no combat and no invented exoplanet. You walk crash-site plains, read what NASA missions actually measured, and take only the materials those worlds are known to hold.

Inner planets are landed or probed. Gas and ice giants are scooped from orbit because they have no solid surface. Earth is the industrial world — copper, silicon, oxygen, liquid water. Mars is iron oxide, perchlorate, and ice. Mercury is metal and polar frost. Venus is acid clouds over basalt at 462 °C. The giants are hydrogen, helium, ammonia, methane, and Saturn's water-ice rings.

Crafting is in-situ resource utilization: sinter a hull from hematite, split ice into propellant, build electronics from Earth, tank cryogenic hydrogen from Jupiter, and fly home on ice-giant methane. Every recipe and every survey note cites a NASA or partner dataset — MESSENGER, Magellan, Pioneer Venus, Odyssey, MRO, Phoenix, Curiosity, Perseverance, Galileo, Juno, Cassini, Voyager 2.

The solar system is the whole map. Eight planets. Nothing else.`;
