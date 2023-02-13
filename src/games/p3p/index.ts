import { createCanvas, loadImage, Canvas } from "canvas";
import { Demon, Game } from "src/types";
import DemonData from "./data/demon-data.json";
import SkillData from "./data/skill-data.json";

const P3P: Game = {
  color: 0xecb3cd,
  demons: DemonData,
  skills: SkillData,
  options: {
    hasFusionSkills: false,
  },
  createWeakResistBanner: createWeakResistBanner,
};

async function createWeakResistBanner(demon: Demon): Promise<Canvas> {
  // Create canvas
  const canvas = createCanvas(1606, 196);
  const ctx = canvas.getContext("2d");

  // Load and draw resists list background
  const resistslist = await loadImage(
    `src/games/p3p/data/ElementImages/ResistsList.png`
  );
  ctx.drawImage(resistslist, 0, 0, canvas.width, canvas.height);

  // Load images
  const weakicon = await loadImage(`src/games/p3p/data/ElementImages/Weak.png`);
  const resisticon = await loadImage(
    `src/games/p3p/data/ElementImages/Resist.png`
  );
  const neutralicon = await loadImage(
    `src/games/p3p/data/ElementImages/Neutral.png`
  );
  const nullicon = await loadImage(`src/games/p3p/data/ElementImages/Null.png`);
  const drainicon = await loadImage(
    `src/games/p3p/data/ElementImages/Drain.png`
  );
  const repelicon = await loadImage(
    `src/games/p3p/data/ElementImages/Repel.png`
  );

  // Draw images onto list
  let xcoordinate = 1;
  for (let i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        xcoordinate = 134;
        break;
      case 1:
        xcoordinate = 284;
        break;
      case 2:
        xcoordinate = 436;
        break;
      case 3:
        xcoordinate = 623;
        break;
      case 4:
        xcoordinate = 775;
        break;
      case 5:
        xcoordinate = 927;
        break;
      case 6:
        xcoordinate = 1079;
        break;
      case 7:
        xcoordinate = 1231;
        break;
      case 8:
        xcoordinate = 1383;
        break;
      default:
        break;
    }
    switch (demon.resists[i]) {
      case "w":
        ctx.drawImage(
          weakicon,
          xcoordinate,
          118,
          weakicon.width,
          weakicon.height
        );
        break;
      case "n":
        ctx.drawImage(
          nullicon,
          xcoordinate,
          118,
          nullicon.width,
          nullicon.height
        );
        break;
      case "s":
        ctx.drawImage(
          resisticon,
          xcoordinate,
          118,
          resisticon.width,
          resisticon.height
        );
        break;
      case "d":
        ctx.drawImage(
          drainicon,
          xcoordinate,
          118,
          drainicon.width,
          drainicon.height
        );
        break;
      case "r":
        ctx.drawImage(
          repelicon,
          xcoordinate,
          118,
          repelicon.width,
          repelicon.height
        );
        break;
      default:
        ctx.drawImage(
          neutralicon,
          xcoordinate + 11,
          135,
          neutralicon.width,
          neutralicon.height
        );
    }
  }

  return canvas;
}

export default P3P;
