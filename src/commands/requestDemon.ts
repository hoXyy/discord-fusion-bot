import Games from "../games";
import * as fs from "fs";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
  AutocompleteInteraction,
} from "discord.js";
interface Skill {
  name: string;
  level: number;
}
interface FusionSkill {
  demon1: string;
  demon2: string;
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
        const rawSkillList = Object.keys(demon.skills);
        let formattedSkillList: Skill[] = [];
        rawSkillList.forEach((skill) => {
          formattedSkillList.push({
            name: skill,
            level: demon.skills[skill as keyof typeof demon.skills],
          });
        });
        formattedSkillList.sort((a, b) => {
          return a.level - b.level;
        });
        var file = new AttachmentBuilder(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/DemonImages/DroppedTheCards.webp`
        );
        var DemonImageName = `DroppedTheCards.webp`;
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
        let embed = new EmbedBuilder()
          .setColor(game.color)
          .setTimestamp()
          .setTitle(interaction.options.getString("demon", true))
          .setThumbnail(`attachment://${DemonImageName}`)
          .setFields(
            {
              name: interaction.options.getString("game", true).startsWith("p")
                ? "Arcana"
                : "Race",
              value: demon.race,
            },
            { name: "Level", value: demon.lvl.toString() },
            {
              name: "Stats",
              value: `\n**Strength:** ${demon.stats[0]}\n**Magic:** ${demon.stats[1]}\n**Endurance:** ${demon.stats[2]}\n**Agility:** ${demon.stats[3]}\n**Luck:** ${demon.stats[4]}`,
            },
            {
              name: "Skills",
              value: " ",
            }
          );
        for (let i = 0; i < formattedSkillList.length; i++) {
          let skill = formattedSkillList[i];

          if (skill.level < 100) {
            embed.addFields({
              name: skill.name,
              value:
                skill.level == 0 ? "Innate" : `Learned at level ${skill.level}`,
              inline: true,
            });
          }

          if (game.specialSkills && skill.level == 3883) {
            const fusionskill: FusionSkill =
              game.specialSkills[
                `${skill.name}` as keyof typeof game.specialSkills
              ];
            if (fusionskill) {
              embed.addFields({
                name: skill.name,
                value: `Fusion skill (${fusionskill.demon1} and ${fusionskill.demon2})`,
                inline: true,
              });
            }
          }
        }
        interaction.reply({ embeds: [embed], files: [file] });
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
