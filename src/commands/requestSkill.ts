import Games from "../games";
import * as fs from "fs";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  AutocompleteInteraction,
} from "discord.js";

const RequestSkillCommand = {
  data: new SlashCommandBuilder()
    .setName("skill")
    .setDescription("See data of a specific skill")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game to get the skill from.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("skill")
        .setDescription("The skill to find.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const game =
      Games[interaction.options.getString("game", true) as keyof typeof Games];
    if (game) {
      const skill =
        game.skills[
          interaction.options.getString(
            "skill",
            true
          ) as keyof typeof game.skills
        ];
      if (skill) {
        // Get skill element
        const element = skill.element;

        // Get default element image
        var file = new AttachmentBuilder(
          `src/games/${interaction.options.getString(
            "game",
            true
          )}/data/ElementImages/DroppedTheCards.webp`
        );
        var ElementImageName = `DroppedTheCards.webp`;

        // Check if element file for this specific skill exists, if so, use it
        if (
          fs.existsSync(
            `src/games/${interaction.options.getString(
              "game",
              true
            )}/data/ElementImages/${element}.webp`
          )
        ) {
          file = new AttachmentBuilder(
            `src/games/${interaction.options.getString(
              "game",
              true
            )}/data/ElementImages/${element}.webp`
          );
          ElementImageName = `${element}.webp`;
        }

        //Parsing skill cost
        var cost = "";
        switch (interaction.options.getString("game", true)) {
          case "p3":
          case "p3p":
          case "p4g":
            switch (skill.element) {
              case "phys":
              case "strike":
              case "pierce":
              case "slash":
                cost = `${skill.cost}% HP`;
                break;
              default:
                var costcalc = skill.cost - 1000;
                cost = `${costcalc.toString()} SP`;
                if (skill.unique == "Fusion Spell") {
                  cost = `${costcalc.toString()}% SP`;
                  if((interaction.options.getString("game", true)) == "p3p")
                  {
                    cost = skill.cost;
                  }
                }
            }
            break;
          case "smtv":
            if (skill.cost > 2000) {
              cost = "Magatsuhi skill";
            } else {
              const costcalc = skill.cost - 1000;
              cost = `${costcalc.toString()} MP`;
            }
            break;
          default:
            break;
        }

        // Prepare embed
        const embed = {
          color: game.color,
          title: interaction.options.getString("skill", true),
          thumbnail: {
            url: `attachment://${ElementImageName.replace(" ", "_").replace(
              "'",
              ""
            )}`,
          },
          fields: [
            {
              name: typeof skill.cost !== "undefined" ? "Cost" : "",
              value: typeof skill.cost !== "undefined" ? `${cost}` : "",
            },
            {
              name: typeof skill.damage !== "undefined" ? "Damage" : "",
              value:
                typeof skill.damage !== "undefined" ? `${skill.damage}` : "",
            },
            {
              name: typeof skill.hit !== "undefined" ? "Accuracy" : "",
              value: typeof skill.hit !== "undefined" ? `${skill.hit}` : "",
            },
            {
              name: typeof skill.power !== "undefined" ? "Power" : "",
              value: typeof skill.power !== "undefined" ? `${skill.power}` : "",
            },
            {
              name: "Effect",
              value: `${skill.effect}`,
            },
            {
              name: typeof skill.target !== "undefined" ? "Target" : "",
              value:
                typeof skill.target !== "undefined" ? `${skill.target}` : "",
            },
            {
              name: typeof skill.card !== "undefined" ? "Skill Card" : "",
              value:
                (typeof skill.card !== "undefined" ? `${skill.card}` : "") +
                (typeof skill.clvl !== "undefined"
                  ? ` gives at Level ${skill.clvl}`
                  : ""),
            },
            {
              name: typeof skill.rank !== "undefined" ? "Rank" : "",
              value: typeof skill.rank !== "undefined" ? `${skill.rank}` : "",
            },
          ],
          timestamp: new Date().toISOString(),
        };

        interaction.reply({
          embeds: [embed],
          files: [file],
        });
      } else {
        interaction.reply("Skill not found!");
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

    if (focusedOption.name === "skill") {
      const game =
        Games[
          interaction.options.getString("game", true) as keyof typeof Games
        ];
      if (game) {
        choices = Object.keys(game.skills);
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

export default RequestSkillCommand;
