import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Collection,
  PermissionResolvable,
  Message,
  AutocompleteInteraction,
} from "discord.js";

export interface SlashCommand {
  data: SlashCommandBuilder | any;
  execute: (interaction: ChatInputCommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommand>;
  }
}

export interface Games {
  p3: Game;
  p4g: Game;
}

interface Game {
  color: number;
  demons: Demons;
  specialSkills?: object;
}

interface Demons {
  [key: string]: Demon;
}

type Demon = {
  [key: string]: any;
  heart?: string;
  inherits: string;
  lvl: number;
  race: string;
  stats: number[];
  skills: Skill;
};

interface Skill {
  [key: string]: number;
}

interface FusionSkill {
  [key: string]: any
}
