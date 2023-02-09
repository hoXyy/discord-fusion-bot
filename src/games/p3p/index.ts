import { Game } from 'src/types';
import DemonData from './data/demon-data.json';
import SkillData from './data/skill-data.json';

const P3P: Game = {
    color: 0xecb3cd,
    demons: DemonData,
    skills: SkillData,
    options: {
        hasFusionSkills: false,
    }
}

export default P3P;