import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Tank } from "./models/Tank.js";

/**
 * Seeds the database with a starter set of Israeli armor.
 * Run with:  npm run seed
 * This WIPES the existing tanks collection first.
 */
const tanks = [
  {
    tankName: "Merkava",
    variant: "Mk 4 M Windbreaker",
    armament: "120 mm MG253 smoothbore gun",
    serviceTime: "2004–Present",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Merkava-Mk4m-whiteback01.jpg/1280px-Merkava-Mk4m-whiteback01.jpg",
    description:
      "The most advanced variant of the Merkava line, fitted with the Trophy active protection system (\"Windbreaker\") that intercepts incoming projectiles before impact.",
    history:
      "Developed by the Israeli Ordnance Corps and MANTAK, the Mk 4 entered service in 2004. The 'Meil Ruach' (Windbreaker) Trophy APS was integrated from 2009 and has since defeated numerous anti-tank guided missiles and RPGs in combat, becoming a benchmark for active protection worldwide.",
    specifications: {
      weight: "65 tonnes",
      crewSize: "4 (commander, gunner, loader, driver)",
      speed: "64 km/h (road)",
    },
  },
  {
    tankName: "Merkava",
    variant: "Mk 3 Baz",
    armament: "120 mm MG251 smoothbore gun",
    serviceTime: "1989–Present",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Merkava-3-latrun-2.jpg",
    description:
      "Introduced the locally developed 120 mm gun and modular composite armor that can be replaced in the field after damage.",
    history:
      "The Mk 3 marked a major leap with a 1,200 hp engine, the Baz fire-control system, and threat-warning electronics. It served as the backbone of IDF armored divisions throughout the 1990s and 2000s.",
    specifications: {
      weight: "65 tonnes",
      crewSize: "4",
      speed: "60 km/h (road)",
    },
  },
  {
    tankName: "Merkava",
    variant: "Mk 1",
    armament: "105 mm M64 rifled gun",
    serviceTime: "1979–1990s",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Israeli_Merkava_Mk_II_Tank_Unveiled_in_1983.jpg/1280px-Israeli_Merkava_Mk_II_Tank_Unveiled_in_1983.jpg",
    description:
      "The original Merkava, designed with a front-mounted engine to maximize crew survivability — a signature of the entire family.",
    history:
      "Conceived under General Israel Tal after the cancellation of a UK Chieftain deal, the Mk 1 first saw action in the 1982 Lebanon War. Its crew-first design philosophy influenced tank doctrine globally.",
    specifications: {
      weight: "63 tonnes",
      crewSize: "4",
      speed: "46 km/h (road)",
    },
  },
  {
    tankName: "Magach",
    variant: "7C Gimel",
    armament: "105 mm M68 rifled gun",
    serviceTime: "1990s–2014",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Magach-7-latrun-2.jpg",
    description:
      "A heavily upgraded M60 with passive composite armor giving it a distinctive angular turret profile.",
    history:
      "The Magach series were modernized American M48 and M60 Pattons. The 7C variant added Blazer/passive armor packages and improved fire control, serving until replaced by the Merkava in frontline units.",
    specifications: {
      weight: "55 tonnes",
      crewSize: "4",
      speed: "48 km/h (road)",
    },
  },
  {
    tankName: "Sho't",
    variant: "Kal",
    armament: "105 mm L7 rifled gun",
    serviceTime: "1970–1990s",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Israeli_%E2%80%98Sho%E2%80%99t_Kal%E2%80%99_Main_Battle_Tank_%E2%80%93_Kubinka_Tank_Museum_%2837900654732%29.jpg/1280px-Israeli_%E2%80%98Sho%E2%80%99t_Kal%E2%80%99_Main_Battle_Tank_%E2%80%93_Kubinka_Tank_Museum_%2837900654732%29.jpg",
    description:
      "An Israeli-rebuilt Centurion with an American diesel powerpack — 'Sho't' means 'Whip' in Hebrew.",
    history:
      "Sho't tanks famously held the Golan Heights during the 1973 Yom Kippur War, where a small number of Centurions repelled a vastly larger Syrian armored force in the Valley of Tears.",
    specifications: {
      weight: "51 tonnes",
      crewSize: "4",
      speed: "43 km/h (road)",
    },
  },
  {
    tankName: "Sabra",
    variant: "Mk II",
    armament: "120 mm MG253 smoothbore gun",
    serviceTime: "2000s–Present (export)",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Sabra_tank.jpg/1280px-Sabra_tank.jpg",
    description:
      "An export-oriented deep modernization of the M60, upgunned to 120 mm with modern armor and fire control.",
    history:
      "Developed by IMI for the export market, the Sabra was adopted by the Turkish Army (as the M60T) and reflects Israel's expertise in extending the life of legacy platforms.",
    specifications: {
      weight: "59 tonnes",
      crewSize: "4",
      speed: "55 km/h (road)",
    },
  },
];

async function run() {
  await connectDB(process.env.MONGO_URI);
  await Tank.deleteMany({});
  const inserted = await Tank.insertMany(tanks);
  console.log(`✔  Seeded ${inserted.length} tanks.`);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("✖  Seed failed:", err);
  process.exit(1);
});
