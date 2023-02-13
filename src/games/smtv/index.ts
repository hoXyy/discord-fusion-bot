import { createCanvas, loadImage, Canvas } from "canvas";
import { Demon, Game } from 'src/types';
import DemonData from './data/demon-data.json';
import SkillData from './data/skill-data.json';

const SMTV: Game = {
    color: 0xBDAB72,
    demons: DemonData,
    skills: SkillData,
    options: {
        hasFusionSkills: false
    },
    createWeakResistBanner: createWeakResistBanner
}

async function createWeakResistBanner(demon: Demon): Promise<Canvas> {
    // Create canvas
    const canvas = createCanvas(936, 96);
    const ctx = canvas.getContext("2d");

      // Load and draw resists list background
  const resistslist = await loadImage(
    `src/games/smtv/data/ElementImages/ResistsList.png`
  );
  ctx.drawImage(resistslist, 0, 0, canvas.width, canvas.height);

  // Load images
  const weakicon = await loadImage(`src/games/smtv/data/ElementImages/Weak.png`);
  const resisticon = await loadImage(
    `src/games/smtv/data/ElementImages/Resist.png`
  );
  const neutralicon = await loadImage(
    `src/games/smtv/data/ElementImages/Neutral.png`
  );
  const nullicon = await loadImage(`src/games/smtv/data/ElementImages/Null.png`);
  const drainicon = await loadImage(
    `src/games/smtv/data/ElementImages/Drain.png`
  );
  const repelicon = await loadImage(
    `src/games/smtv/data/ElementImages/Repel.png`
  );

  // Draw images onto list
  let xcoordinate = 23;
  for (let i = 0; i < 13; i++) {
    switch (i) {
      case 0:
        xcoordinate = 23;
        break;
      case 1:
        xcoordinate = 95;
        break;
      case 2:
        xcoordinate = 168;
        break;
      case 3:
        xcoordinate = 242;
        break;
      case 4:
        xcoordinate = 313;
        break;
      case 5:
        xcoordinate = 382;
        break;
      case 6:
        xcoordinate = 456;
        break;
      case 7:
        xcoordinate = 528;
        break;
      case 8:
        xcoordinate = 598;
        break;
      case 9:
        xcoordinate = 672;
        break;
      case 10:
        xcoordinate = 740;
        break;
      case 11:
        xcoordinate = 812;
        break;
      case 12:
        xcoordinate = 887;
        break;
      default:
        break;
    }
    if (i < 7) {
      switch (demon.resists[i]) {
        case "w":
          ctx.drawImage(
            weakicon,
            xcoordinate,
            55,
            weakicon.width,
            weakicon.height
          );
          break;
        case "n":
          ctx.drawImage(
            nullicon,
            xcoordinate,
            55,
            nullicon.width,
            nullicon.height
          );
          break;
        case "s":
          ctx.drawImage(
            resisticon,
            xcoordinate,
            55,
            resisticon.width,
            resisticon.height
          );
          break;
        case "d":
          ctx.drawImage(
            drainicon,
            xcoordinate,
            55,
            drainicon.width,
            drainicon.height
          );
          break;
        case "r":
          ctx.drawImage(
            repelicon,
            xcoordinate,
            55,
            repelicon.width,
            repelicon.height
          );
          break;
        default:
          ctx.drawImage(
            neutralicon,
            xcoordinate,
            66,
            neutralicon.width,
            neutralicon.height
          );
          break;
      }
    } else {
      if (demon.ailments) {
        switch (demon.ailments[i - 7]) {
          case "w":
            ctx.drawImage(
              weakicon,
              xcoordinate,
              55,
              weakicon.width,
              weakicon.height
            );
            break;
          case "n":
            ctx.drawImage(
              nullicon,
              xcoordinate,
              55,
              nullicon.width,
              nullicon.height
            );
            break;
          case "s":
            ctx.drawImage(
              resisticon,
              xcoordinate,
              55,
              resisticon.width,
              resisticon.height
            );
            break;
          case "d":
            ctx.drawImage(
              drainicon,
              xcoordinate,
              55,
              drainicon.width,
              drainicon.height
            );
            break;
          case "r":
            ctx.drawImage(
              repelicon,
              xcoordinate,
              55,
              repelicon.width,
              repelicon.height
            );
            break;
          default:
            ctx.drawImage(
              neutralicon,
              xcoordinate,
              66,
              neutralicon.width,
              neutralicon.height
            );
            break;
        }
      } else {
        ctx.drawImage(
          neutralicon,
          xcoordinate,
          66,
          neutralicon.width,
          neutralicon.height
        );
      }
    }
  }

  return canvas;
}

export default SMTV;