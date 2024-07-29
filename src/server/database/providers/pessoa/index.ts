import * as create from "./Create";
import *  as deleteById from "./Delete";
import * as getById from "./GetById";
import * as update from "./Update";
import * as getAll from  './GetAll';

export const pessoaProvider = {
  ...create,...deleteById,...getById,...update,...getAll
};