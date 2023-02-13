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
        if (
          interaction.options.getString("game", true) == "p3p" ||
          interaction.options.getString("game", true) == "p4"
        ) {
          var file = new AttachmentBuilder(
            `src/games/p4g/data/DemonImages/DroppedTheCards.webp`
          );
        }
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
        } else {
          file = new AttachmentBuilder(
            `src/games/p4g/data/DemonImages/${interaction.options.getString(
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
        const canvas = await game.createWeakResistBanner(demon);

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
            url: `attachment://resists-list.png`,
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
              name: "resists-list.png",
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
