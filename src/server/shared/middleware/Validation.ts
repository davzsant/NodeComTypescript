import { RequestHandler } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = 'body' | 'header'| 'params' | 'query'
type TALLSchemas = Record<TProperty,yup.ObjectSchema<any>>
type TValidation = (getAllSchemas:TGetAllSchemas) => RequestHandler
type TGetSchema = <T extends yup.Maybe<yup.AnyObject>>(schema:yup.ObjectSchema<T>) => yup.ObjectSchema<T>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>

export const validation: TValidation = (getAllSchemas) => async(req, res, next )=>{
  const schemas = getAllSchemas(schema => schema);

  const errorsResult:Record<string,Record<string,string>> = {};

  Object.entries(schemas).forEach(([key,schema])=>{
    try{
      schema.validateSync(req[key as TProperty],{abortEarly:false});
    }catch(err){
      const yupError = err as yup.ValidationError;
      const errors : Record<string,string> = {}; /*Armazenaruma lista de errors */
  
      yupError.inner.forEach(excp =>{
        if(excp.path === undefined) return; /*O path é para verificar onde esta o erro */
  
        errors[excp.path] = excp.message;
      });
      errorsResult[key]  = errors;
    }

    if(Object.entries(errorsResult).length === 0){
      return next();
    } else{
      return  res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
    }
    
  });
  

};