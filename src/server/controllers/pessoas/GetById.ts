import { validation } from "../../shared/middleware";
import { Request,Response } from "express";
import * as yup from 'yup';
import { pessoaProvider } from "../../database/providers/pessoa";
import { StatusCodes } from "http-status-codes";

interface iParamProps{
  id?:number
}

export const getByIdValidation = validation((getSchema)=>({
  params: getSchema<iParamProps>(yup.object().shape({
    id: yup.number().optional().moreThan(0)
  }))
}));

export const getById = async(req:Request<iParamProps>,res:Response) =>{

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default: "O parametro id precisa ser informado"
      }
    });
  }

  const result = await pessoaProvider.getById(req.params.id);

  if(result instanceof Error){
    console.log(res.headersSent?"1-Ja enviado":"1-Nao enviado");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      {
        error:
        {
          default: result.message
        }

      });
  }
  
  console.log(res.headersSent?"2-Ja enviado":"2-Nao enviado");
  return res.status(StatusCodes.OK).json(result);
};
