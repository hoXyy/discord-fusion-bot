import { createCanvas, loadImage, Canvas } from "canvas";
import { Demon, Game } from "src/types";
import DemonData from "./data/demon-data.json";
import SkillData from "./data/skill-data.json";

const P4G: Game = {
  color: 0xffe600,
  demons: DemonData,
  skills: SkillData,
  options: {
    hasFusionSkills: false,
  },
  createWeakResistBanner: createWeakResistBanner,
};

async function createWeakResistBanner(demon: Demon): Promise<Canvas> {
  // Create canvas
  const canvas = createCanvas(1046, 174);
  const ctx = canvas.getContext("2d");

  // Load and draw resists list background
  const resistslist = await loadImage(
    `src/games/p4g/data/ElementImages/ResistsList.png`
  );
  ctx.drawImage(resistslist, 0, 0, canvas.width, canvas.height);

  // Load images
  const weakicon = await loadImage(`src/games/p4g/data/ElementImages/Weak.png`);
  const resisticon = await loadImage(
    `src/games/p4g/data/ElementImages/Resist.png`
  );
  const neutralicon = await loadImage(
    `src/games/p4g/data/ElementImages/Neutral.png`
  );
  const nullicon = await loadImage(`src/games/p4g/data/ElementImages/Null.png`);
  const drainicon = await loadImage(
    `src/games/p4g/data/ElementImages/Drain.png`
  );
  const repelicon = await loadImage(
    `src/games/p4g/data/ElementImages/Repel.png`
  );

  // Draw images onto list
  let xcoordinate = 1;
  for (let i = 0; i < 7; i++) {
    switch (i) {
      case 0:
        xcoordinate = 1;
        break;
      case 1:
        xcoordinate = 183;
        break;
      case 2:
        xcoordinate = 328;
        break;
      case 3:
        xcoordinate = 472;
        break;
      case 4:
        xcoordinate = 619;
        break;
      case 5:
        xcoordinate = 764;
        break;
      case 6:
        xcoordinate = 908;
        break;
      default:
        break;
    }
    switch (demon.resists[i]) {
      case "w":
        ctx.drawImage(
          weakicon,
          xcoordinate,
          93,
          weakicon.width,
          weakicon.height
        );
        break;
      case "n":
        ctx.drawImage(
          nullicon,
          xcoordinate,
          93,
          nullicon.width,
          nullicon.height
        );
        break;
      case "s":
        ctx.drawImage(
          resisticon,
          xcoordinate,
          93,
          resisticon.width,
          resisticon.height
        );
        break;
      case "d":
        ctx.drawImage(
          drainicon,
          xcoordinate,
          93,
          drainicon.width,
          drainicon.height
        );
        break;
      case "r":
        ctx.drawImage(
          repelicon,
          xcoordinate,
          93,
          repelicon.width,
          repelicon.height
        );
        break;
      default:
        ctx.drawImage(
          neutralicon,
          xcoordinate,
          93,
          neutralicon.width,
          neutralicon.height
        );
        break;
    }
  }

  return canvas;
}

export default P4G;
