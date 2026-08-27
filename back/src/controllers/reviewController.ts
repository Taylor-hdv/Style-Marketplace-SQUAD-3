import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class ReviewController {

    public static async createReview(req: Request, resp: Response) {
        try {
            const {
                rating,
                text,
                userId,
                productId
            } = req.body;

            const foundUser = await prisma.user.findUnique({
                where: {
                    id: String(userId)
                }
            });

            if (!foundUser) {
                return resp.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            const foundProduct = await prisma.product.findUnique({
                where: {
                    id: String(productId)
                }
            });

            if (!foundProduct) {
                return resp.status(404).json({
                    message: "Produto não encontrado."
                });
            }

            const createdReview = await prisma.review.create({
                data: {
                    rating,
                    text,
                    userId: String(userId),
                    productId: String(productId)
                }
            });

            return resp.status(201).json({
                message: "Avaliação criada com sucesso.",
                review: createdReview
            });

        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }


    public static async readReview(req: Request, resp: Response) {
        try {
            const { reviewId } = req.params;

            const foundReview = await prisma.review.findUnique({
                where: {
                    id: String(reviewId)
                },
                include: {
                    user: true,
                    product: true
                }
            });

            if (!foundReview) {
                return resp.status(404).json({
                    message: "Avaliação não encontrada."
                });
            }

            return resp.status(200).json(foundReview);

        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }


    public static async readAllReviews(req: Request, resp: Response) {
        try {
            const reviews = await prisma.review.findMany({
                include: {
                    user: true,
                    product: true
                }
            });

            return resp.status(200).json(reviews);

        } catch (error: any) {
            return resp.status(500).json({
                message: error.message
            });
        }
    }


    public static async updateReview(req: Request, resp: Response) {
        try {
            const { reviewId } = req.params;
            const { rating, text } = req.body;

            const updateData = {
                ...(rating !== undefined && { rating }),
                ...(text !== undefined && { text })
            };

            const updatedReview = await prisma.review.update({
                where: {
                    id: String(reviewId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Avaliação atualizada com sucesso.",
                review: updatedReview
            });

        } catch (error: any) {
            if (error.code === "P2025") {
                return resp.status(404).json({
                    message: "Avaliação não encontrada."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }


    public static async deleteReview(req: Request, resp: Response) {
        try {
            const { reviewId } = req.params;

            await prisma.review.delete({
                where: {
                    id: String(reviewId)
                }
            });

            return resp.status(200).json({
                message: "Avaliação deletada com sucesso."
            });

        } catch (error: any) {
            if (error.code === "P2025") {
                return resp.status(404).json({
                    message: "Avaliação não encontrada."
                });
            }

            return resp.status(500).json({
                message: error.message
            });
        }
    }
}