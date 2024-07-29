import { Router} from 'express';

const router = Router();

import {cidadesControllers, pessoasController, usuariosController} from "./../controllers";
import { ensureAuthenticated } from '../shared/middleware';

router.get('/',(_,res)=>{
  return res.send("Ola dev");
});
 
router.get("/cidades",ensureAuthenticated ,cidadesControllers.getAllValidation,cidadesControllers.getAll);
router.get("/cidades/:id",ensureAuthenticated ,cidadesControllers.getByIdValidation,cidadesControllers.getByID);
router.post("/cidades",ensureAuthenticated ,cidadesControllers.createValidation,cidadesControllers.create);
router.put("/cidades/:id",ensureAuthenticated ,cidadesControllers.updateValidation,cidadesControllers.update);
router.delete('/cidades/:id',ensureAuthenticated ,cidadesControllers.deleteValidation,cidadesControllers.deleteRegister);

router.get("/pessoas",ensureAuthenticated ,pessoasController.getAllValidation,pessoasController.getAll);
router.get("/pessoas/:id",ensureAuthenticated ,pessoasController.getByIdValidation,pessoasController.getById);
router.post("/pessoa",ensureAuthenticated ,pessoasController.createValidation,pessoasController.create);
router.put("/pessoas/:id",ensureAuthenticated ,pessoasController.updateValidation,pessoasController.update);
router.delete('/pessoas/:id',ensureAuthenticated ,pessoasController.deleteValidation,pessoasController.deleteRegister);

router.get("/entrar",usuariosController.signInValidation,usuariosController.signIn);
router.post("/cadastrar",usuariosController.signUpValidation,usuariosController.signUp);

export { router};