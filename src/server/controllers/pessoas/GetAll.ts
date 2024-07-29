/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { pessoaProvider } from "../../database/providers/pessoa";
import { count } from "../../database/providers/cidades/Count";

/*Para definir os tipos de dados que serao aceitos */
interface iQueryProps{
  page?:number,
  limit?:number,
  filter?:string
}

interface iParamsProps{
  id?:number
}

/*Ira validar os campos */
export const getAllValidation = validation((getSchema)=>({
  query: getSchema<iQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0).integer(),
    limit: yup.number().optional().moreThan(0).integer(),
    filter: yup.string().optional(),
  })),
  params: getSchema<iParamsProps>(yup.object().shape({
    id: yup.number().optional().moreThan(0).integer()
  }))

}));

/*Criar de fato */
export const getAll = async (req: Request<iParamsProps,{},{},iQueryProps>,res: Response) => {
  const result = await pessoaProvider.getAllRegisters(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || '',
  );
  const countRegister = await count(req.query.filter);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }else if(countRegister instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default:countRegister.message
      }
    });
  }
  res.setHeader('acess-control-expose-header','x-total-count');
  res.setHeader('x-total-count',countRegister);
  return res.status(StatusCodes.OK).json(result);
};
