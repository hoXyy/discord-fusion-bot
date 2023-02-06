import { Game } from 'src/types';
import DemonData from './data/demon-data.json';

const P4G: Game = {
    color: 0xffe600,
    demons: DemonData,
    options: {
        hasFusionSkills: false
    }
}

export default P4G;