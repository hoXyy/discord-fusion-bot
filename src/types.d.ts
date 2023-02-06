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
  smtv: Game;
}

interface Game {
  color: number;
  demons: Demons;
  options: {
    hasFusionSkills: boolean;
    fusionSkills?: FusionSkills;
  }
}

interface Demons {
  [key: string]: Demon;
}

type Demon = {
  [key: string]: any;
  heart?: string;
  inherits?: string;
  lvl: number;
  resists: string;
  race: string;
  stats: number[];
  skills: Skill;
  affinities?: number[];
  ailments?: string;
  price?: number;
};

interface Skill {
  [key: string]: number;
}

interface FusionSkills {
  [key: string]: FusionSkill;
}

interface FusionSkill {
  demon1: string;
  demon2: string;
}
