import { validation } from "../../shared/middleware";
import { Request,Response } from "express";
import * as yup from 'yup';
import { pessoaProvider } from "../../database/providers/pessoa";
import { iPessoa } from "../../database/models";
import { StatusCodes } from "http-status-codes";

interface iBodyProps extends Omit<iPessoa,"id">{}

export const createValidation = validation((getSchema)=>({
  body: getSchema<iBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3).max(150),
    email: yup.string().required(),
    cidadeId : yup.number().required()
  }))
}));

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async(req:Request<{},{},iBodyProps>,res:Response) =>{
  const result = await pessoaProvider.create(req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
