import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ProductController } from "../controllers/productController";
import { VariantController } from "../controllers/variantController";

const router = Router();

router.post("/login", UserController.login);
router.post("/user", UserController.createUser);
router.get("/user/:userId",  UserController.readUser);
router.get("/users",  UserController.readAllUsers);
router.put("/user/:userId",  UserController.updateUser);
router.delete("/user/:userId",  UserController.deleteUser);

router.post("/product", ProductController.createProduct);
router.get("/product/:productId", ProductController.readProduct);
router.get("/products", ProductController.readAllProducts);
router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);

router.post("/variant", VariantController.createVariant);
router.get("/variant/:variantId", VariantController.readVariant);
router.get("/variants", VariantController.readAllVariants);
router.put("/variant/:variantId", VariantController.updateVariant);
router.delete("/variant/:variantId", VariantController.deleteVariant);

export default router;