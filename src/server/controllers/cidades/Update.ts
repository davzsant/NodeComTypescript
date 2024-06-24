/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { iCidade } from "../../database/models";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

interface iBodyProps extends Omit<iCidade,'id'>{}

/*Ira validar os campos */
export const updateValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<iBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(100)
  }))
}));

/*Criar de fato */
export const update = async (req: Request<iParamProp,{},iBodyProps>,res: Response) => {
  if(Number(req.params.id) === 99999) return res.status(StatusCodes.NOT_FOUND).json({
    errors: {
      default: "Registro nao encontrado"
    }
  });
  return res.status(StatusCodes.NO_CONTENT).send();
};