import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { deleteById } from "../../database/providers/cidades/Delete";

/*Para definir os tipos de dados que serao aceitos */
interface iParamProp{
  id:number
}

/*Ira validar os campos */
export const deleteValidation = validation((getSchema)=>({
  params: getSchema<iParamProp>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
}));

/*Criar de fato */
export const deleteRegister = async (req: Request<iParamProp>,res: Response) => {
  
  const result = await deleteById(req.params.id);
  if(result instanceof Error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:{
        default:result.message
      }
    });
  }
  res.status(StatusCodes.OK).json({text:"Deletado com sucesso"});
};
