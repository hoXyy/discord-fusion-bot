import { Game } from 'src/types';
import DemonData from './data/demon-data.json';
import SkillData from './data/skill-data.json';

const SMTV: Game = {
    color: 0xBDAB72,
    demons: DemonData,
    skills: SkillData,
    options: {
        hasFusionSkills: false
    }
}

export default SMTV;