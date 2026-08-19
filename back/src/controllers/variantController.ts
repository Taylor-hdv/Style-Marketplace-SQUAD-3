import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class VariantController {

    public static async createVariant(req: Request, resp: Response) {
        try {
            const {
                color,
                size,
                quantity,
                price,
                productId
            } = req.body;

            const foundProduct = await prisma.product.findUnique({
                where: {
                    id: String(productId)
                }
            });

            if (!foundProduct) {
                return resp.status(400).json({
                    message: "Produto não encontrado."
                });
            }

            const createData: Prisma.VariantCreateInput = {
                color,
                size,
                quantity,
                price,
                product: {
                    connect: {
                        id: String(productId)
                    }
                }
            };

            const createdVariant = await prisma.variant.create({
                data: createData
            });

            return resp.status(201).json({
                message: "Variante criada com sucesso.",
                variant: createdVariant
            });

        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async readVariant(req: Request, resp: Response) {
        try {
            const { variantId } = req.params;
            
            const foundVariant = await prisma.variant.findUnique({
                where: {
                    id: String(variantId)
                },
                include: {
                    product: true
                }
            });

            if (!foundVariant) {
                return resp.status(404).json({
                    message: "Variante não encontrada."
                });
            }

            return resp.status(200).json(foundVariant);
        } catch (error:any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async readAllVariants(req: Request, resp: Response) {
        try {
            const variants = await prisma.variant.findMany({
                include: {
                    product: true
                }
            });
            return resp.status(200).json(variants);
        } catch (error:any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async updateVariant(req: Request, resp: Response) {
        try {
            const { variantId } = req.params;

            const {
                color,
                size,
                quantity,
                price
            } = req.body;

            const updateData: Prisma.VariantUpdateInput = {
                ...(color !== undefined && { color }),
                ...(size !== undefined && { size }),
                ...(quantity !== undefined && { quantity }),
                ...(price !== undefined && { price }),
            };

            const updatedVariant = await prisma.variant.update({
                where: {
                    id: String(variantId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Variante atualizada com sucesso.",
                product: updatedVariant
            });
        } catch (error:any) {
            if (error.code === "P2026") {
                return resp.status(404).json({
                    message: "Variante não encontrada."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }

    public static async deleteVariant(req: Request, resp: Response) {
        try {
            const { variantId } = req.params;

            await prisma.variant.delete({
                where: {
                    id: String(variantId)
                }
            });

            return resp.status(200).json({
                message: "Variante deletada com sucesso"
            });

        } catch (error: any) {
            if (error.code === "P2025") {
                return resp.status(404).json({
                    message: "Variante não encontrada"
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }
}