/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { iCidade } from "../../database/models";
import { cidadesProviders } from "../../database/providers/cidades";

/*Para definir os tipos de dados que serao aceitos */
interface iBodyProps extends Omit<iCidade,'id'>{}

/*Ira validar os campos */
export const createValidation = validation((getSchema)=>({
  body: getSchema<iBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(100),
    
  })),
}));

/*Criar de fato */
export const create = async (req: Request<{},{},iBodyProps>,res: Response) => {
  const result = await cidadesProviders.create(req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:
      {default:result.message}});
  }
  return res.status(StatusCodes.CREATED).json(result);
};
