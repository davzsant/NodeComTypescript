import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { getById } from "../../database/providers/cidades/GetById";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

/*Ira validar os campos */
export const getByIdValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().moreThan(0).optional(),
  })),
}));

/*Criar de fato */
export const getByID = async (req: Request<iParamProp>,res: Response) => {

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default: "O parametro id precisa ser informado"
      }
    });
  }
  const result = await getById(req.params.id);
  if(result instanceof Error){
    return res.status(StatusCodes.NOT_FOUND).json({
      errors:{
        default:result.message
      }});}
  res.status(StatusCodes.OK).json(result);
};
