import { Game } from 'src/types';
import DemonData from './data/demon-data.json';
import FusionSkillData from './data/fusion-skill-list-data.json';

const P3: Game = {
    color: 0x4372AA,
    demons: DemonData,
    options: {
        hasFusionSkills: true,
        fusionSkills: FusionSkillData
    }
}

export default P3;