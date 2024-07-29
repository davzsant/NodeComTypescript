import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id:number):Promise<void | Error> =>{
  try{
    const result = await Knex(ETableNames.pessoa)
      .where('id','=',id)
      .del();

    if (result > 0) return;
    return new Error("Registro inexistente nao pode ser deletado");

  }catch(error){
    console.log(error);
    return new Error("Nao foi possive deletar o registro de cidades");
  }
};