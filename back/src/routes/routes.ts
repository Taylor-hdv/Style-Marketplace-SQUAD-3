import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { TelephoneController } from "../controllers/TelephoneController";

const router = Router();

//Rotas do usuario 
router.post("/login", UserController.login);
router.post("/user", UserController.createUser);
router.get("/user/:userId",  UserController.readUser);
router.get("/users",  UserController.readAllUsers);
router.put("/user/:userId",  UserController.updateUser);
router.delete("/user/:userId",  UserController.deleteUser);


// Rotas do Telefone
router.post("/telephone", TelephoneController.createTelephone);
router.get("/telephone", TelephoneController.readAllTelephones); 
router.get("/telephone/:userId", TelephoneController.readTelephone); 
router.put("/telephone/:userId", TelephoneController.updateTelephone); 
router.delete("/telephone/:userId", TelephoneController.deleteTelephone);


export default router;