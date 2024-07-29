import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
  return knex
    .schema
    .createTable(ETableNames.usuario,table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').notNullable().checkLength('>',3);
      table.string("email").unique().index().notNullable().checkLength('>',5);
      table.string("senha").notNullable().checkLength('>',6);
        
      table.comment("Tabela para armazenar usuarios no sistemas");
    })

    .then(()=>{
      console.log(`# Create table ${ETableNames.usuario}`);
    });
}


export async function down(knex: Knex){
  return knex.schema.dropTable(ETableNames.usuario)
    .then(()=>{
      console.log(`# Drop table ${ETableNames.usuario}`);
    });
}