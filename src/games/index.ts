import { Games } from "../types";
import P3 from "./p3";
import P3P from "./p3p"
import P4G from "./p4g";
import SMTV from "./smtv";

const Games: Games = {
  p3: P3,
  p3p: P3P,
  p4g: P4G,
  smtv: SMTV,
};

export default Games;
