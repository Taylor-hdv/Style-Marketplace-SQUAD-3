import { Router } from "express"; // 🔥 Adicione esta linha aqui!
import { UserController } from "../controllers/UserController";
    
const router = Router();

router.post("/login", UserController.login);
router.post("/user", UserController.createUser);
router.get("/users",  UserController.readAllUsers);
router.get("/user/:userId",  UserController.readUser);
router.put("/user/:userId",  UserController.updateUser);
router.delete("/user/:userId",  UserController.deleteUser);

export default router;