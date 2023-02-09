import { Game } from 'src/types';
import DemonData from './data/demon-data.json';
import FusionSkillData from './data/fusion-skill-list-data.json';
import SkillData from './data/skill-data.json';

const P3: Game = {
    color: 0x4372AA,
    demons: DemonData,
    skills: SkillData,
    options: {
        hasFusionSkills: true,
        fusionSkills: FusionSkillData
    }
}

export default P3;