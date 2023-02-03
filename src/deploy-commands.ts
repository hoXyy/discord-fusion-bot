import { deployCommands } from "./commands";
import { config } from "dotenv";
config();

deployCommands(
  process.env.TOKEN!,
  process.env.CLIENT_ID!,
  process.env.GUILD_ID!
);
