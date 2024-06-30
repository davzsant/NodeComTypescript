/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { getAllRegisters } from "../../database/providers/cidades/GetAll";

/*Para definir os tipos de dados que serao aceitos */
interface iQueryProps{
  page?:number,
  limit?:number,
  filter?:string
}

interface iParamsProps{
  id?:number
}

/*Ira validar os campos */
export const getAllValidation = validation((getSchema)=>({
  query: getSchema<iQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
  params: getSchema<iParamsProps>(yup.object().shape({
    id: yup.number().optional().moreThan(0)
  }))

}));

/*Criar de fato */
export const getAll = async (req: Request<{},{},{},iQueryProps>,res: Response) => {
  const result = await getAllRegisters(
    req.query.page,
    req.query.limit,
    req.query.filter,
    req.params
  )
  res.setHeader('acess-control-expose-header','x-total-count');
  res.setHeader('x-total-count',1);
  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Parnaiba"
    }
  ]);
};
