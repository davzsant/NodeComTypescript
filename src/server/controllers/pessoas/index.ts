import * as create from './Create';
import * as getById from './GetById';
import * as deleteById from './Delete';
import * as updateById from  './Update';
import * as getAll from './GetAll';

export const pessoasController = {
  ...create,
  ...getById,
  ...deleteById,
  ...updateById,
  ...getAll
};