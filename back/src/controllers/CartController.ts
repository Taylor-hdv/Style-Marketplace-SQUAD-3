import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class CartController {

    public static async createCart(req: Request, resp: Response) {
        try {
            const { userId, totalPrice, shipping, totalQuantity } = req.body;

            if (!userId) {
                return resp.status(400).json({ message: "O userId é obrigatorio" });
            }
            const createData: Prisma.CartCreateInput = {
                user: { connect: { id: String(userId) } }
            };

            if (totalPrice !== undefined) createData.totalPrice = totalPrice;
            if (shipping !== undefined) createData.shipping = shipping;
            if (totalQuantity !== undefined) createData.totalQuantity = totalQuantity;

            const createdCart = await prisma.cart.create({ data: createData });
            return resp.status(201).json({ message: "Carrinho criado com sucesso", cart: createdCart });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async readCart(req: Request, resp: Response) {
    try {
        const { cartId } = req.params;

        const foundCart = await prisma.cart.findUnique({
            where: { id: String(cartId) },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!foundCart) {
            return resp.status(404).json({ message: "Carrinho não encontrado" });
        }

        return resp.status(200).json(foundCart);

    } catch (error: any) {
        return resp.status(500).json({ message: error.message });
    }
}

    public static async readAllCarts(req: Request, resp: Response) {
        try {
            const carts = await prisma.cart.findMany();
            return resp.status(200).json(carts);

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async updateCart(req: Request, resp: Response) {
        try {
            const { cartId } = req.params;
            const { totalPrice, shipping, totalQuantity } = req.body;
            let updateData: Prisma.CartUpdateInput = {};

            if (totalPrice !== undefined) updateData.totalPrice = totalPrice;
            if (shipping !== undefined) updateData.shipping = shipping;
            if (totalQuantity !== undefined) updateData.totalQuantity = totalQuantity;

            const updatedCart = await prisma.cart.update({
                where: {
                    id: String(cartId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Carrinho atualizado com sucesso",
                cart: updatedCart
            });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async deleteCart(req: Request, resp: Response) {
        try {
            const { cartId } = req.params;

            await prisma.cart.delete({
                where: {
                    id: String(cartId)
                }
            });

            return resp.status(200).json({
                message: "Carrinho deletado com sucesso",
            });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async addVariantToCart(req: Request, resp: Response) {
        try {
            const { cartId } = req.params;
            const { variantId, itemQuantity } = req.body;
            const variant = await prisma.variant.findUnique({
                where: { id: String(variantId) }
            });
            const existingCartItem = await prisma.cartVariant.findFirst({
                where: {
                    cartId: String(cartId),
                    variantId: String(variantId)
                }
            });

            if (existingCartItem) {
                await prisma.cartVariant.update({
                    where: { id: existingCartItem.id },
                    data: { itemQuantity: existingCartItem.itemQuantity + itemQuantity }
                });
            } else {
                const createData = {
                    itemQuantity: itemQuantity,
                    cart: { connect: { id: String(cartId) } },
                    variant: { connect: { id: String(variantId) } }
                };
                
                await prisma.cartVariant.create({ data: createData });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { id: String(cartId) },
                include: {
                    items: {
                        include: { variant: true }
                    }
                }
            });

            if (updatedCart) {
                let newTotalQuantity = 0;
                let newTotalPrice = 0;

                updatedCart.items.forEach((item: any) => {
                    newTotalQuantity += item.itemQuantity;
                    newTotalPrice += (item.itemQuantity * item.variant.price);
                });

                await prisma.cart.update({
                    where: { id: String(cartId) },
                    data: {
                        totalQuantity: newTotalQuantity,
                        totalPrice: newTotalPrice
                    }
                });
            }
            return resp.status(200).json({ message: "Variante adicionada ao carrinho" });
        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }
}