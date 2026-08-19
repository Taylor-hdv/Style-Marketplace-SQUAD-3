import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ProductController } from "../controllers/productController";
import { VariantController } from "../controllers/variantController";
import { CartController } from "../controllers/CartController";
import { OrderController } from "../controllers/OrderController";

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

router.post("/cart", CartController.createCart);
router.get("/cart/:cartId", CartController.readCart);
router.get("/carts", CartController.readAllCarts);
router.put("/cart/:cartId", CartController.updateCart);
router.delete("/cart/:cartId", CartController.deleteCart);

router.post("/order", OrderController.createOrder);
router.get("/order/:orderId", OrderController.readOrder);
router.get("/orders", OrderController.readAllOrders);
router.put("/order/:orderId", OrderController.updateOrder);
router.delete("/order/:orderId", OrderController.deleteOrder);

export default router;