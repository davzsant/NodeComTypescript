import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { iPessoa } from "../../models";


export const getAllRegisters = async(page:number,limit:number,filter:string):Promise<iPessoa[] | Error>=>{
  try{
    const result = await Knex(ETableNames.pessoa)
      .select('*')
      .where('nomeCompleto','like',`%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;

    
  }catch(error){
    console.log(error);
    return new Error("Nao foi possivel obter todos os registros");
  }
};