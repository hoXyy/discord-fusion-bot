import { Game } from 'src/types';
import DemonData from './data/demon-data.json';
import SkillData from './data/skill-data.json';

const P4G: Game = {
    color: 0xffe600,
    demons: DemonData,
    skills: SkillData,
    options: {
        hasFusionSkills: false
    }
}

export default P4G;