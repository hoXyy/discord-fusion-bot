import { Canvas } from "canvas";
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
  p3p: Game;
  p4g: Game;
  smtv: Game;
}

interface Game {
  color: number;
  demons: Demons;
  skills: SkillsInfoList;
  options: {
    hasFusionSkills: boolean;
    fusionSkills?: FusionSkills;
  };
  createWeakResistBanner: (demon: Demon) => Promise<Canvas>;
  createAffinitiesBanner?: void;
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
  essence_price?: number;
};

interface SkillInfoList {
  [key: string]: Skill;
}

//Skills used from Skill Data
type SkillInfo = {
  [key: string]: any;
  cost: string;
  effect: string;
  element: string;
  target: string;
  card: string;
  damage: string;
  hit: number;
  power: number;
  rank: number;
  clvl: number;
};

//Skills used by Demons
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
