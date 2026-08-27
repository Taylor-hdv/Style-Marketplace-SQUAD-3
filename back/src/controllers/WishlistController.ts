import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class WishlistController {

    public static async readWishlist(req: Request, resp: Response) {
        try {
            const { wishlistId } = req.params;

            const foundWishlist = await prisma.wishlist.findUnique({
                where: { id: String(wishlistId) },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            });

            if (!foundWishlist) {
                return resp.status(404).json({ message: "Wishlist não achada" });
            }
            return resp.status(200).json(foundWishlist);
        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async addProductToWishlist(req: Request, resp: Response) {
        try {
            const { wishlistId } = req.params;
            const { productId } = req.body;

            if (!productId) {
                return resp.status(400).json({ message: "O Id do produto é obrigatório" });
            }

            const existingItem = await prisma.wishlistProduct.findFirst({
                where: {
                    wishlistId: String(wishlistId),
                    productId: String(productId)
                }
            });

            if (existingItem) {
                return resp.status(400).json({ message: "Produto já tá na lista" });
            }

            const createData = {
                wishlist: { connect: { id: String(wishlistId) } },
                product: { connect: { id: String(productId) } }
            };

            await prisma.$transaction([
                prisma.wishlistProduct.create({ data: createData }),
                prisma.wishlist.update({
                    where: { id: String(wishlistId) },
                    data: { quantity: { increment: 1 } }
                })
            ]);
            return resp.status(200).json({ message: "Produto adicionado a wishlist" });
        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async removeProductFromWishlist(req: Request, resp: Response) {
        try {
            const { wishlistId, productId } = req.params;

            const existingItem = await prisma.wishlistProduct.findFirst({
                where: {
                    wishlistId: String(wishlistId),
                    productId: String(productId)
                }
            });

            if (!existingItem) {
                return resp.status(404).json({ message: "Produto não encontrado nessa wishlist" });
            }

            await prisma.$transaction([
                prisma.wishlistProduct.delete({
                    where: { id: existingItem.id }
                }),
                prisma.wishlist.update({
                    where: { id: String(wishlistId) },
                    data: { quantity: { decrement: 1 } }
                })
            ]);
            return resp.status(200).json({ message: "Produto removido da wishlist" });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }
}