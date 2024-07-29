import { validation } from "../../shared/middleware";
import { Request,Response } from "express";
import * as yup from 'yup';
import { usuarioProvider } from "../../database/providers/usuarios";
import { iUsuario } from "../../database/models";
import { StatusCodes } from "http-status-codes";

interface iBodyProps extends Omit<iUsuario,"id">{}

export const signUpValidation = validation((getSchema)=>({
  body: getSchema<iBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3).max(150),
    email: yup.string().required().min(6).email(),
    senha : yup.string().required().min(6)
  }))
}));

// eslint-disable-next-line @typescript-eslint/ban-types
export const signUp = async(req:Request<{},{},iBodyProps>,res:Response) =>{
  const result = await usuarioProvider.create(req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
