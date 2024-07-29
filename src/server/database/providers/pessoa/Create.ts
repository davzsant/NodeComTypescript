import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { iPessoa } from "../../models/Pessoas";

export const create = async (pessoa:Omit<iPessoa,"id">):Promise<number | Error> =>{
  try{

    const [{count}] = await Knex(ETableNames.cidade)
      .where('id','=',pessoa.cidadeId)
      .count<[{ count:number }]>('* as count');

    if (count === 0){
      return new Error("Cidade usada nao foi cadastrada");
    }

    const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');

    if(typeof result == "object"){
      return result.id;
    }else if(typeof result == "number"){
      return result;
    }

    return new Error("Erro na hora de inserir um registro de pessoa");
  }catch(error){
    console.log(error);
    return Error("Erro na hora inserir um registro");
  }

};