import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { iCidade } from "../../models";

export const updateById = async(id:number,cidade:Omit<iCidade,'id'>):Promise<void | Error> =>{
  try{
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where('id','=',id);
    if(result > 0) return;
    return new Error("Registro nao atualizado");
    
  }catch(error){
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }
};