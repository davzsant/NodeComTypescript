import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { iPessoa } from "../../models/Pessoas";

export const getById = async(id:number):Promise<iPessoa | Error> =>{
  try{
    const result = await Knex(ETableNames.pessoa).select('*').where('id',id).first();

    if (result) return result;
    return new Error("Registro não encontrado");
  }catch(error){
    console.log(error);
    return Error("Erro ao obter registro");
  }

};