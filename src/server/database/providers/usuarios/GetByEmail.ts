import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { iUsuario } from "../../models";

export const getByEmail = async (email:string):Promise< iUsuario | Error> => {
  try{
    const result = await Knex(ETableNames.usuario)
      .select('*')
      .where('email','=',email)
      .first();
    console.log(result);
    if (result) return result;
    return new Error("Registro não encontrado");
  }catch(error){
    console.log(error);
    return Error("Erro ao obter registro");
  }
};