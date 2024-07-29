import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { iCidade } from "../../models";

export const create = async (cidade: Omit<iCidade,'id'>):Promise<number | Error> => {
  try{
    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');
    console.log("O id criado foi:"+result);
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