import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class CategoryController {

    public static async createCategory(req: Request, resp: Response) {
        try {
            const { name } = req.body;

            const createData = {
                name
            }

            const createdCategory = await prisma.category.create({
                data: createData
            });

            return resp.status(201).json({
                message: "Categoria criada com sucesso",
                category: createdCategory
            });
        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async readCategory(req: Request, resp: Response) {
        try {
            const { categoryId } = req.params;

            const foundCategory = await prisma.category.findUnique({
                where: {
                    id: String(categoryId)
                },
                include: {
                    productCategories: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!foundCategory) {
                return resp.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            return resp.status(200).json(foundCategory);

        } catch (error: any) {
            return resp.status(500).json({
                message:error.message
            });
        }
        
    }

    public static async readAllCategories(req: Request, resp: Response) {
        try {
            const categories = await prisma.category.findMany({
                include: {
                    productCategories: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            return resp.status(200).json(categories);
        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async updateCategory(req: Request, resp: Response) {
        try {
            const { categoryId } = req.params;
            const { name } = req.body;

            const updateData = {
                ...(name !== undefined && { name })
            };

            const updatedCategory = await prisma.category.update({
                where: {
                    id: String(categoryId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Categoria atualizada com sucesso.",
                category: updatedCategory
            });

        } catch (error:any) {
            if (error.code === "P2026") {
                return resp.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async deleteCategory(req: Request, resp: Response) {
        try {
            const { categoryId } = req.params;

            await prisma.category.delete({
                where: {
                    id: String(categoryId)
                }
            });

            return resp.status(200).json({
                message: "Categoria deletada com sucesso."
            });

        } catch (error: any) {
            if (error.code === "P2026") {
                return resp.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async addProductToCategory(req: Request, resp: Response) {
    try {
        const { categoryId, productId } = req.params;

        const foundCategory = await prisma.category.findUnique({
            where: {
                id: String(categoryId)
            }
        });

        if (!foundCategory) {
            return resp.status(404).json({
                message: "Categoria não encontrada"
            });
        }

        const foundProduct = await prisma.product.findUnique({
            where: {
                id: String(productId)
            }
        });

        if (!foundProduct) {
            return resp.status(404).json({
                message: "Produto não encontrado"
            });
        }

        const existingAssociation = await prisma.productCategory.findUnique({
            where: {
                productId_categoryId: {
                    productId: String(productId),
                    categoryId: String(categoryId)
                }
            }
        });

        if (existingAssociation) {
            return resp.status(409).json({
                message: "Produto já está associado a esta categoria"
            });
        }

        await prisma.$transaction([
            prisma.productCategory.create({
                data: {
                    productId: String(productId),
                    categoryId: String(categoryId)
                }
            }),

            prisma.category.update({
                where: {
                    id: String(categoryId)
                },
                data: {
                    quantity: {
                        increment: 1
                    }
                }
            })
        ]);

        return resp.status(200).json({
            message: "Produto associado à categoria com sucesso"
        });

    } catch (error: any) {
        return resp.status(500).json({
            message: error.message
        });
    }
    }

    public static async removeProductFromCategory(req: Request, resp: Response) {
    try {
        const { categoryId, productId } = req.params;

        const existingAssociation = await prisma.productCategory.findUnique({
            where: {
                productId_categoryId: {
                    productId: String(productId),
                    categoryId: String(categoryId)
                }
            }
        });

        if (!existingAssociation) {
            return resp.status(404).json({
                message: "Produto não está associado a esta categoria."
            });
        }

        await prisma.$transaction([
            prisma.productCategory.delete({
                where: {
                    productId_categoryId: {
                        productId: String(productId),
                        categoryId: String(categoryId)
                    }
                }
            }),

            prisma.category.update({
                where: {
                    id: String(categoryId)
                },
                data: {
                    quantity: {
                        decrement: 1
                    }
                }
            })
        ]);

        return resp.status(200).json({
            message: "Produto desassociado da categoria com sucesso."
        });

    } catch (error: any) {
        return resp.status(500).json({
            message: error.message
        });
    }
}

}