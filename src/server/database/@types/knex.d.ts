import { iCidade,iPessoa,iUsuario } from "../models";

declare module 'knex/types/tables' {
  interface Tables{
    cidade : iCidade
    pessoa : iPessoa
    usuario : iUsuario
  }
}