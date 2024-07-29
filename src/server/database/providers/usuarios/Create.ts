import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { iUsuario } from "../../models";

export const create = async (usuario: Omit<iUsuario,'id'>):Promise<number | Error> => {
  try{
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);
    const [result] = await Knex(ETableNames.usuario)
      .insert({...usuario,senha:hashedPassword})
      .returning('id');

    if(typeof result === "object"){
      return result.id;
    }else if(typeof result === "number"){
      return result;
    }

    return new Error("Erro ao cadastrar registro");
  }catch(error){
    console.log(error);
    return Error("Erro ao cadastrar registros");
  }
};