/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

/*Para definir os tipos de dados que serao aceitos */
interface iCidade{
  nome:string,
}

/*Ira validar os campos */
export const createValidation = validation((getSchema)=>({
  body: getSchema<iCidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));

/*Criar de fato */
export const create = async (req: Request<{},{},iCidade>,res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};
