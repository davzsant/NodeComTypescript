import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { getById } from "../../database/providers/cidades/GetById";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id:number
}

/*Ira validar os campos */
export const getByIdValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().moreThan(0).required(),
  })),
}));

/*Criar de fato */
export const getByID = async (req: Request<iParamProp>,res: Response) => {
  const result = await getById(req.params.id);
  if(result instanceof Error){
    res.send(StatusCodes.NOT_FOUND).json({
      error:{
        default:result.message
      }});}
  res.status(StatusCodes.OK).json(result);
};
