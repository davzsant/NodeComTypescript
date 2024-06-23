/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

interface iBodyProp{
  nome:string;
}

/*Ira validar os campos */
export const updateValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<iBodyProp>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));

/*Criar de fato */
export const update = async (req: Request<iParamProp,{},iBodyProp>,res: Response) => {
  if(Number(req.params.id) === 99999) return res.status(StatusCodes.NOT_FOUND).json({
    errors: {
      default: "Registro nao encontrado"
    }
  });
  return res.status(StatusCodes.NO_CONTENT).send();
};