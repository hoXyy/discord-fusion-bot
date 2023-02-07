import Games from "../games";
import * as fs from "fs";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  AutocompleteInteraction,
} from "discord.js";

interface Skill {
  name: string;
  level: number;
}

const RequestEssenceCommand = {
  data: new SlashCommandBuilder()
    .setName("essence")
    .setDescription("See stats of a specific essence in SMT V.")
    .addStringOption((option) =>
      option
        .setName("essence")
        .setDescription("The essence to find.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const game = Games["smtv"];
    if (game) {
      const demon =
        game.demons[
          interaction.options.getString(
            "essence",
            true
          ) as keyof typeof game.demons
        ];
      if (demon) {
        // Get default essence image
        var file = new AttachmentBuilder(
          `src/games/smtv/data/EssenceImages/DroppedTheCards.webp`
        );
        var EssenceImageName = `DroppedTheCards.webp`;

        // Check if essence file for this specific essence exists, if so, use it
        if (
          fs.existsSync(
            `src/games/smtv/data/EssenceImages/${interaction.options.getString(
              "essence",
              true
            )}.webp`
          )
        ) {
          file = new AttachmentBuilder(
            `src/games/smtv/data/EssenceImages/${interaction.options.getString(
              "essence",
              true
            )}.webp`
          );
          EssenceImageName = `${interaction.options.getString(
            "essence",
            true
          )}.webp`;
        }

        // Prepare embed
        const embed = {
          color: game.color,
          title: interaction.options.getString("essence", true),
          thumbnail: {
            url: `attachment://${EssenceImageName.replace(" ", "_").replace(
              "'",
              ""
            )}`,
          },
          fields: [
            {
              name: "Race",
              value: demon.race,
              inline: false,
            },
            {
              name: "Level",
              value: demon.lvl.toString(),
              inline: false,
            },
            {
              name: "Price",
              value: demon.essence_price
                ? demon.essence_price.toString()
                : "Not purchasable",
              inline: false,
            },
            {
              name: "Skills",
              value: " ",
              inline: false,
            },
          ],
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
        }

        interaction.reply({
          embeds: [embed],
          files: [file],
        });
      }
    }
  },
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true);
    const choices = Object.keys(Games["smtv"].demons);

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

export default RequestEssenceCommand;
