import { Demon, Game } from "src/types";
import DemonData from "./data/demon-data.json";
import FusionSkillData from "./data/fusion-skill-list-data.json";
import SkillData from "./data/skill-data.json";
import { createCanvas, loadImage, Canvas } from "canvas";

const P3: Game = {
  color: 0x4372aa,
  demons: DemonData,
  skills: SkillData,
  options: {
    hasFusionSkills: true,
    fusionSkills: FusionSkillData,
  },
  createWeakResistBanner: createWeakResistBanner,
};

async function createWeakResistBanner(demon: Demon): Promise<Canvas> {
  // Create canvas
  const canvas = createCanvas(1144, 192);
  const ctx = canvas.getContext("2d");

  // Load and draw resists list background
  const resistslist = await loadImage(
    `src/games/p3/data/ElementImages/ResistsList.png`
  );
  ctx.drawImage(resistslist, 0, 0, canvas.width, canvas.height);

  // Load images
  const weakicon = await loadImage(`src/games/p3/data/ElementImages/Weak.png`);
  const resisticon = await loadImage(
    `src/games/p3/data/ElementImages/Resist.png`
  );
  const neutralicon = await loadImage(
    `src/games/p3/data/ElementImages/Neutral.png`
  );
  const nullicon = await loadImage(`src/games/p3/data/ElementImages/Null.png`);
  const drainicon = await loadImage(
    `src/games/p3/data/ElementImages/Drain.png`
  );
  const repelicon = await loadImage(
    `src/games/p3/data/ElementImages/Repel.png`
  );

  // Draw images onto list
  let xcoordinate = 1;
  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        xcoordinate = 28;
        break;
      case 1:
        xcoordinate = 149;
        break;
      case 2:
        xcoordinate = 268;
        break;
      case 3:
        xcoordinate = 419;
        break;
      case 4:
        xcoordinate = 539;
        break;
      case 5:
        xcoordinate = 659;
        break;
      case 6:
        xcoordinate = 779;
        break;
      case 7:
        xcoordinate = 899;
        break;
      case 8:
        xcoordinate = 1019;
        break;
      default:
        break;
    }
    switch (demon.resists[i]) {
      case "w":
        ctx.drawImage(
          weakicon,
          xcoordinate,
          121,
          weakicon.width,
          weakicon.height
        );
        break;
      case "n":
        ctx.drawImage(
          nullicon,
          xcoordinate,
          121,
          nullicon.width,
          nullicon.height
        );
        break;
      case "s":
        ctx.drawImage(
          resisticon,
          xcoordinate,
          121,
          resisticon.width,
          resisticon.height
        );
        break;
      case "d":
        ctx.drawImage(
          drainicon,
          xcoordinate,
          121,
          drainicon.width,
          drainicon.height
        );
        break;
      case "r":
        ctx.drawImage(
          repelicon,
          xcoordinate,
          121,
          repelicon.width,
          repelicon.height
        );
        break;
      default:
        ctx.drawImage(
          neutralicon,
          xcoordinate,
          100,
          neutralicon.width,
          neutralicon.height
        );
        break;
    }
  }

  return canvas;
}

export default P3;
