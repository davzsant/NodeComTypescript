import { RequestHandler } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = 'body' | 'header'| 'params' | 'query'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TALLSchemas = Record<TProperty,yup.ObjectSchema<any>>
type TValidation = (getAllSchemas:TGetAllSchemas) => RequestHandler
type TGetSchema = <T extends yup.Maybe<yup.AnyObject>>(schema:yup.ObjectSchema<T>) => yup.ObjectSchema<T>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>

export const validation: TValidation = (getAllSchemas) => async(req, res, next )=>{
  const schemas = getAllSchemas(schema => schema);

  const errorsResult:Record<string,Record<string,string>> = {};

  for(const key of Object.keys(schemas) as TProperty[]){
    const schema = schemas[key];
    if(!schema) continue;

    try{
      await schema.validate(req[key],{abortEarly:false});
    }catch (err){
      const yupError = err as yup.ValidationError;
      const errors: Record<string,string> = {};

      yupError.inner.forEach(excp =>{
        if(excp.path  == undefined) return;
        errors[excp.path] = excp.message;
      });
      errorsResult[key] = errors;
      
    }
    if(Object.keys(errorsResult).length === 0){
      return next();
    }else{
      return res.status(StatusCodes.BAD_REQUEST).json({errors:errorsResult});
    }
    

  }
};