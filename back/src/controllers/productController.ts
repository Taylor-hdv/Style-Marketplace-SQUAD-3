import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema";

export class ProductController {

    public static async createProduct(req: Request, resp: Response) {
        try {
            const validation = createProductSchema.safeParse(req.body);

            if (!validation.success) {
                return resp.status(400).json({
                    message: "Dados inválidos",
                    errors: validation.error.flatten().fieldErrors
                });
            }

            const {
                name,
                discount,
                description,
                tag,
                specification
            } = validation.data;

            const createData: Prisma.ProductCreateInput = {
                name,
                discount,
                description,
                tag,
                specification
            };

            const createdProduct = await prisma.product.create({
                data: createData
            });

            return resp.status(201).json({
                message: "Produto criado com sucesso.",
                product: createdProduct
            });
            
        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async readProduct(req: Request, resp: Response) {
        try {
            const { productId } = req.params;
            
            const foundProduct = await prisma.product.findUnique({
                where: {
                    id: String(productId)
                },
                include: {
                    variants: true,
                    productCategories:{
                        include:{
                            category:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                }
            });

            if (!foundProduct) {
                return resp.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            return resp.status(200).json(foundProduct);
        } catch (error:any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async readAllProducts(req: Request, resp: Response) {
        try {
            const products = await prisma.product.findMany({
                include: {
                    variants: true,
                    productCategories:{
                        include:{
                            category:{
                                select: {
                                    name:true
                                }
                            }
                        }
                    }
                       
                    
                }
            });
            return resp.status(200).json(products);
        } catch (error:any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async updateProduct(req: Request, resp: Response) {
        try {
            const { productId } = req.params;

            const {
                name,
                discount,
                description,
                tag,
                specification
            } = req.body;

            const updateData: Prisma.ProductUpdateInput = {
                ...(name !== undefined && { name }),
                ...(discount !== undefined && { discount }),
                ...(description !== undefined && { description }),
                ...(tag !== undefined && { tag }),
                ...(specification !== undefined && { specification })
            };

            const updatedProduct = await prisma.product.update({
                where: {
                    id: String(productId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Produto atualizado com sucesso.",
                product: updatedProduct
            });
        } catch (error:any) {
            if (error.code === "P2026") {
                return resp.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async deleteProduct(req: Request, resp: Response) {
        try {
            const { productId } = req.params;

            await prisma.product.delete({
                where: {
                    id: String(productId)
                }
            });

            return resp.status(200).json({
                message: "Produto deletado com sucesso."
            });

        } catch (error: any) {
            if (error.code === "P2026") {
                return resp.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }
}