import { Router} from 'express';

const router = Router();

import {cidadesControllers} from "./../controllers";

router.get('/',(_,res)=>{
  return res.send("Ola dev");
});
 
router.get("/cidades",cidadesControllers.getAllValidation,cidadesControllers.getAll);
router.get("/cidades/:id",cidadesControllers.getByIdValidation,cidadesControllers.getByID);
router.post("/cidades",cidadesControllers.createValidation,cidadesControllers.create);
router.put("/cidades/:id",cidadesControllers.updateValidation,cidadesControllers.update);
router.delete('/cidades/:id',cidadesControllers.deleteValidation,cidadesControllers.deleteRegister);

export { router};