import { validation } from "../../shared/middleware";
import { Request,Response } from "express";
import * as yup from 'yup';
import { usuarioProvider } from "../../database/providers/usuarios";
import { iUsuario } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface iBodyProps extends Omit<iUsuario,"id" | 'nomeCompleto'>{}

export const signInValidation = validation((getSchema)=>({
  body: getSchema<iBodyProps>(yup.object().shape({
    email: yup.string().required().min(6).email(),
    senha : yup.string().required().min(6)
  }))
}));

// eslint-disable-next-line @typescript-eslint/ban-types
export const signIn = async(req:Request<{},{},iBodyProps>,res:Response) =>{

  const {email,senha} = req.body;

  const result = await usuarioProvider.getByEmail(email);

  if(result instanceof Error){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors:{
        default: "Email ou senha invalidos"
      }
    });
  }
  const passwordMatch = await PasswordCrypto.verifyPassword(senha,result.senha);
  if(!passwordMatch){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors:{
        default: "Email ou senha invalidos"
      }
    });
  }else{
    const acessToken = JWTService.sign({uid: result.id});
    if(acessToken === 'JWT_SECRET_NOT_FOUND'){
      if(!passwordMatch){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors:{
            default: "Erro ao gerar o token de acesso"
          }
        });
      }
    }
    return res.status(StatusCodes.OK).json({acessToken});
  }
  /* return res.status(StatusCodes.OK).json(result); */
};
