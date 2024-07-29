import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { iPessoa } from "../../models/Pessoas";

export const updateById = async(id:number,pessoa:Omit<iPessoa,'id'>):Promise<void | Error> =>{
  try{
    console.log(pessoa);
    const [{count}] = await Knex(ETableNames.cidade)
      .where('id','=',pessoa.cidadeId)
      .count<[{ count:number }]>('* as count');

    if (count === 0){
      return new Error("Cidade usada nao foi cadastrada");
    }
    
    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where('id','=',id);
    if(result > 0) return;
    return new Error("Registro nao atualizado");
    
  }catch(error){
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }
};