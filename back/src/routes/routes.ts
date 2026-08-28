import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ProductController } from "../controllers/productController";
import { VariantController } from "../controllers/variantController";
import { CategoryController } from "../controllers/categoryController";
import { TelephoneController } from "../controllers/TelephoneController";
import {validate} from "../middlewares/Validate"
import {createUserSchema,updateUserSchema,loginSchema} from "../schemas/UserSchema"
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { ReviewController } from "../controllers/reviewController";
import {telephoneSchema} from "../config/TelephoneValidator"
import {createVariantSchema,updateVariantSchema} from "../config/VariantValidator"
import { CartController } from "../controllers/CartController";
import { OrderController } from "../controllers/OrderController";

const router = Router();

//Rotas do usuario 
router.post("/login", validate(loginSchema),UserController.login);
router.post("/user", validate(createUserSchema), UserController.createUser);
router.get("/user/:userId", AuthMiddleware.execute, UserController.readUser);
router.get("/users", UserController.readAllUsers);
router.put("/user/:userId",  AuthMiddleware.execute,validate(updateUserSchema),UserController.updateUser);
router.delete("/user/:userId", AuthMiddleware.execute, UserController.deleteUser);

router.post("/product", ProductController.createProduct);
router.get("/product/:productId", ProductController.readProduct);
router.get("/products", ProductController.readAllProducts);
router.put("/product/:productId", ProductController.updateProduct);
router.delete("/product/:productId", ProductController.deleteProduct);

router.post("/variant", validate(createVariantSchema), VariantController.createVariant);
router.get("/variant/:variantId", VariantController.readVariant);
router.get("/variants", VariantController.readAllVariants);
router.put("/variant/:variantId", validate(updateVariantSchema), VariantController.updateVariant);
router.delete("/variant/:variantId", VariantController.deleteVariant);

router.post("/category", CategoryController.createCategory);
router.get("/category/:categoryId", CategoryController.readCategory);
router.get("/categories", CategoryController.readAllCategories);
router.put("/category/:categoryId", CategoryController.updateCategory);
router.delete("/category/:categoryId", CategoryController.deleteCategory);

router.post("/category/:categoryId/product/:productId", CategoryController.addProductToCategory);
router.delete("/category/:categoryId/product/:productId", CategoryController.removeProductFromCategory);

router.post("/review", ReviewController.createReview);
router.get("/review/:reviewId", ReviewController.readReview);
router.get("/reviews", ReviewController.readAllReviews);
router.put("/review/:reviewId", ReviewController.updateReview);
router.delete("/review/:reviewId", ReviewController.deleteReview);


// Rotas do Telefone
router.get("/telephone", TelephoneController.readAllTelephones); 
router.get("/telephone/:userId", TelephoneController.readTelephone); 
router.put("/telephone/:userId", validate(telephoneSchema),TelephoneController.updateTelephone); 
router.delete("/telephone/:userId", TelephoneController.deleteTelephone);


router.post("/cart", CartController.createCart);
router.get("/cart/:cartId", CartController.readCart);
router.get("/carts", CartController.readAllCarts);
router.put("/cart/:cartId", CartController.updateCart);
router.delete("/cart/:cartId", CartController.deleteCart);
router.post("/cart/:cartId/add", CartController.addVariantToCart);

router.post("/order", OrderController.createOrder);
router.get("/order/:orderId", OrderController.readOrder);
router.get("/orders", OrderController.readAllOrders);
router.put("/order/:orderId", OrderController.updateOrder);
router.delete("/order/:orderId", OrderController.deleteOrder);

export default router;