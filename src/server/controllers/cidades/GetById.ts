import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

/*Ira validar os campos */
export const getByIdValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().optional().moreThan(0),
  })),
}));

/*Criar de fato */
export const getByID = async (req: Request<iParamProp>,res: Response) => {
  if(Number(req.params.id) === 99999) return res.status(StatusCodes.NOT_FOUND).json({errors:{default:"registro nao encontrado"}});
  return res.status(StatusCodes.OK).json({
    id:2,
    nome:"Pernambuco"
  });
};
