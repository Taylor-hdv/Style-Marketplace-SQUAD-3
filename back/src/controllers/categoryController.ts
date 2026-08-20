import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class CategoryController {

    public static async createCategory(req: Request, resp: Response) {
        try {
            const { name, quantity } = req.body;

            const createData = {
                name,
                quantity
            };

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
                    products: true
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
                    products: true
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
            const { name, quantity } = req.body;

            const updateData = {
                ...(name !== undefined && { name }),
                ...(quantity !== undefined && { quantity })
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
}