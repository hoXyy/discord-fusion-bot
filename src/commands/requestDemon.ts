import Games from "../games";
import * as fs from "fs";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
  AutocompleteInteraction,
} from "discord.js";
import { createCanvas, loadImage } from "canvas";

interface Skill {
  name: string;
  level: number;
}

const RequestDemonCommand = {
  data: new SlashCommandBuilder()
    .setName("demon")
    .setDescription("See stats of a specific demon.")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game to get the demon from.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("demon")
        .setDescription("The demon to find.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const game =
      Games[interaction.options.getString("game", true) as keyof typeof Games];
    if (game) {
      const demon =
        game.demons[
          interaction.options.getString(
            "demon",
            true
          ) as keyof typeof game.demons
        ];
      if (demon) {
        // Get default demon image
        var file = new AttachmentBuilder(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/DemonImages/DroppedTheCards.webp`
        );
        var DemonImageName = `DroppedTheCards.webp`;

        // Check if demon file for this specific demon exists, if so, use it
        if (
          fs.existsSync(
            `src/games/${interaction.options.getString(
              "game",
              true
            )}/data/DemonImages/${interaction.options.getString(
              "demon",
              true
            )}.webp`
          )
        ) {
          file = new AttachmentBuilder(
            `src/games/${interaction.options.getString(
              "game",
              true
            )}/data/DemonImages/${interaction.options.getString(
              "demon",
              true
            )}.webp`
          );
          DemonImageName = `${interaction.options.getString(
            "demon",
            true
          )}.webp`;
        }

        //Set demon stats for specific game
        var stats = "";
        switch (interaction.options.getString("game", true)) {
          case "p3":
          case "p3p":
          case "p4g":
            stats = `\n**Strength:** ${demon.stats[0]}\n**Magic:** ${demon.stats[1]}\n**Endurance:** ${demon.stats[2]}\n**Agility:** ${demon.stats[3]}\n**Luck:** ${demon.stats[4]}`;
            break;
          case "smtv":
            stats = `\n**HP:** ${demon.stats[0]}\n**MP:** ${demon.stats[1]}\n**Strength:** ${demon.stats[2]}\n**Vitality:** ${demon.stats[3]}\n**Magic:** ${demon.stats[4]}\n**Agility:** ${demon.stats[5]}\n**Luck:** ${demon.stats[6]}`;
            break;
          default:
            break;
        }

        //Prepare resistances canvas
        var canvas = createCanvas(936, 96);
        var ctx = canvas.getContext("2d");
        switch (interaction.options.getString("game", true)) {
          case "p3":
            canvas = createCanvas(1144, 192);
            ctx = canvas.getContext("2d");
            break;
          case "p3p":
            canvas = createCanvas(1606, 196);
            ctx = canvas.getContext("2d");
            break;
          case "p4g":
            canvas = createCanvas(1046, 174);
            ctx = canvas.getContext("2d");
            break;
          case "smtv":
            canvas = createCanvas(936, 96);
            ctx = canvas.getContext("2d");
            break;
          default:
            break;
        }
        const resistslist = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/ResistsList.png`
        );
        ctx.drawImage(resistslist, 0, 0, canvas.width, canvas.height);

        const weakicon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Weak.png`
        );
        const resisticon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Resist.png`
        );
        const neutralicon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Neutral.png`
        );
        const nullicon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Null.png`
        );
        const drainicon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Drain.png`
        );
        const repelicon = await loadImage(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/Repel.png`
        );

        switch (interaction.options.getString("game", true)) {
          case "p3":
            var xcoordinate = 1;
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
            break;
          case "p3p":
            var xcoordinate = 1;
            for (let i = 0; i < 9; i++) {
              switch (i) {
                case 0:
                  xcoordinate = 114;
                  break;
                case 1:
                  xcoordinate = 264;
                  break;
                case 2:
                  xcoordinate = 416;
                  break;
                case 3:
                  xcoordinate = 603;
                  break;
                case 4:
                  xcoordinate = 755;
                  break;
                case 5:
                  xcoordinate = 907;
                  break;
                case 6:
                  xcoordinate = 1059;
                  break;
                case 7:
                  xcoordinate = 1211;
                  break;
                case 8:
                  xcoordinate = 1363;
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
                    xcoordinate,
                    145,
                    neutralicon.width,
                    neutralicon.height
                  );
              }
            }
            break;
          case "p4g":
            var xcoordinate = 1;
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
            break;
          case "smtv":
            var xcoordinate = 23;
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
            break;
          default:
            break;
        }

        // Prepare embed
        const embed = {
          color: game.color,
          title: interaction.options.getString("demon", true),
          thumbnail: {
            url: `attachment://${DemonImageName.replace(" ", "_").replace(
              "'",
              ""
            )}`,
          },
          fields: [
            {
              name: interaction.options.getString("game", true).startsWith("p")
                ? "Arcana"
                : "Race",
              value: demon.race,
              inline: false,
            },
            {
              name: "Level",
              value: demon.lvl.toString(),
              inline: false,
            },
            {
              name: "Stats",
              value: stats,
            },
            {
              name: "Skills",
              value: " ",
              inline: false,
            },
          ],
          image: {
            url: `attachment://resists-list.webp`,
          },
          timestamp: new Date().toISOString(),
        };

        // Get array of all skills
        const rawSkillList = Object.keys(demon.skills);
        let formattedSkillList: Skill[] = [];
        rawSkillList.forEach((skill) => {
          formattedSkillList.push({
            name: skill,
            level: demon.skills[skill as keyof typeof demon.skills],
          });
        });

        // Sort the skill array by level
        formattedSkillList.sort((a, b) => {
          return a.level - b.level;
        });

        // Add skills to embed
        for (let i = 0; i < formattedSkillList.length; i++) {
          const skill = formattedSkillList[i];
          if (skill.level < 100) {
            embed.fields.push({
              name: skill.name,
              value:
                skill.level == 0 ? "Innate" : `Learned at level ${skill.level}`,
              inline: true,
            });
          }
          if (game.options.hasFusionSkills && skill.level == 3883) {
            const fusionskill =
              game.options.fusionSkills![
                `${skill.name}` as keyof typeof game.options.fusionSkills
              ];
            if (fusionskill) {
              embed.fields.push({
                name: skill.name,
                value: `Fusion skill (${fusionskill.demon1} and ${fusionskill.demon2})`,
                inline: true,
              });
            }
          }
        }

        //Set demon affinities
        if (interaction.options.getString("game", true) == "smtv") {
          const elementname: string[] = [
            "Physical",
            "Fire",
            "Ice",
            "Electricity",
            "Force",
            "Light",
            "Dark",
            "Almighty",
            "Ailment",
            "Recovery",
            "Support",
          ];
          embed.fields.push({
            name: "Affinities",
            value: "",
          });
          var affinitiesresult = "";
          for (let i = 0; i < 11; i++) {
            if (demon.affinities![i] > 0) {
              affinitiesresult = `+${demon.affinities![i].toString()}`;
            } else {
              affinitiesresult = `${demon.affinities![i].toString()}`;
            }
            embed.fields.push({
              name: elementname[i],
              value: affinitiesresult,
              inline: true,
            });
          }
        }

        interaction.reply({
          embeds: [embed],
          files: [
            file,
            {
              attachment: canvas.toBuffer(),
              name: "resists-list.webp",
            },
          ],
        });
      } else {
        interaction.reply("Demon not found!");
      }
    } else {
      interaction.reply("Game not found!");
    }
  },
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices: string[] = [];

    if (focusedOption.name === "game") {
      choices = Object.keys(Games);
    }

    if (focusedOption.name === "demon") {
      const game =
        Games[
          interaction.options.getString("game", true) as keyof typeof Games
        ];
      if (game) {
        choices = Object.keys(game.demons);
      } else {
        choices = [];
      }
    }

    const filtered = choices
      .filter((choice) => {
        if (
          choice.toLowerCase().startsWith(focusedOption.value.toLowerCase())
        ) {
          return choice;
        }
      })
      .slice(0, 25);
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
};

export default RequestDemonCommand;
