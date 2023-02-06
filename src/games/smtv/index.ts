import { Game } from 'src/types';
import DemonData from './data/demon-data.json';

const SMTV: Game = {
    color: 0xBDAB72,
    demons: DemonData,
    options: {
        hasFusionSkills: false
    }
}

export default SMTV;