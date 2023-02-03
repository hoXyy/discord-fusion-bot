import { REST, Routes } from "discord.js";
import RequestDemonCommand from "./requestDemon";
import PingCommand from "./ping";

const Commands = [RequestDemonCommand, PingCommand];

export async function deployCommands(
  token: string,
  clientId: string,
  guildId: string
) {
  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: "10" }).setToken(token);

  const commands = [
    RequestDemonCommand.data.toJSON(),
    PingCommand.data.toJSON(),
  ];

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
  } catch (error) {
    console.error(error);
  }
}

export default Commands;
