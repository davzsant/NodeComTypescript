/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { iPessoa } from "../../database/models";
import { pessoaProvider } from "../../database/providers/pessoa";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

interface iBodyProps extends Omit<iPessoa,'id'>{}

/*Ira validar os campos */
export const updateValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().optional().moreThan(0),
  })),
  body: getSchema<iBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3).max(100),
    email: yup.string().required().min(7).email(),
    cidadeId: yup.number().required().moreThan(0)
    
  }))
}));

/*Criar de fato */
export const update = async (req: Request<iParamProp,{},iBodyProps>,res: Response) => {
  const result = await pessoaProvider.updateById(Number(req.params.id),req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default:result.message
      }
    });
  }
  res.status(StatusCodes.NO_CONTENT).send();

};