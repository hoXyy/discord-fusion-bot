// Our imports
import Commands from "./commands";

// Libraries imports
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
let discordClient = new Client({ intents: GatewayIntentBits.Guilds });
import { config } from "dotenv";
config();

discordClient.commands = new Collection();

for (let i = 0; i < Commands.length; i++) {
  const command = Commands[i];
  if ("data" in command && "execute" in command) {
    discordClient.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] One of the commands is missing a required "data" or "execute" property.`
    );
  }
}

discordClient.once(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user!.tag}`);
});

discordClient.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      if (command.autocomplete) {
        await command.autocomplete(interaction);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

discordClient.login(process.env.TOKEN);
