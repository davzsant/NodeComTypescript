import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { deleteById } from "../../database/providers/cidades/Delete";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id?:number
}

/*Ira validar os campos */
export const deleteValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().optional().moreThan(0),
  })),
}));

/*Criar de fato */
export const deleteRegister = async (req: Request<iParamProp>,res: Response) => {
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default: "O parametro id precisa ser informado"
      }
    });
  }
  const result = await deleteById(req.params.id);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default:result.message
      }
    });
  }
  res.status(StatusCodes.NO_CONTENT).send();
};
