import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export class OrderController {

    public static async createOrder(req: Request, resp: Response) {
        try {
            const { userId, totalQuantity, status, adress, totalPrice, shipping, paymentMethod } = req.body;

            if (!userId || totalQuantity === undefined || !adress || totalPrice === undefined || shipping === undefined) {
                return resp.status(400).json({ message: "userId, totalQuantity, adress, totalPrice e shipping são obrigatórios" });
            }

            const createData: Prisma.OrderCreateInput = {
                user: { connect: { id: String(userId) } },
                totalQuantity: totalQuantity,
                adress: adress,
                totalPrice: totalPrice,
                shipping: shipping
            };

            if (status !== undefined) createData.status = status;
            if (paymentMethod !== undefined) createData.paymentMethod = paymentMethod;

            const createdOrder = await prisma.order.create({ data: createData });
            return resp.status(201).json({ message: "Pedido criado com sucesso", order: createdOrder });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async readOrder(req: Request, resp: Response) {
        try {
            const { orderId } = req.params;

            const foundOrder = await prisma.order.findUnique({
                where: {
                    id: String(orderId)
                },
                include: {
                    user: true
                }
            });

            if (!foundOrder) {
                return resp.status(404).json({ message: "Pedido não encontrado" });
            }

            return resp.status(200).json(foundOrder);

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async readAllOrders(req: Request, resp: Response) {
        try {
            const orders = await prisma.order.findMany();
            return resp.status(200).json(orders);

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async updateOrder(req: Request, resp: Response) {
        try {
            const { orderId } = req.params;
            const { totalQuantity, status, adress, totalPrice, shipping, paymentMethod } = req.body;
            let updateData: Prisma.OrderUpdateInput = {};

            if (totalQuantity !== undefined) updateData.totalQuantity = totalQuantity;
            if (status !== undefined) updateData.status = status;
            if (adress !== undefined) updateData.adress = adress;
            if (totalPrice !== undefined) updateData.totalPrice = totalPrice;
            if (shipping !== undefined) updateData.shipping = shipping;
            if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;

            const updatedOrder = await prisma.order.update({
                where: {
                    id: String(orderId)
                },
                data: updateData
            });

            return resp.status(200).json({
                message: "Pedido atualizado com sucesso",
                order: updatedOrder
            });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }

    public static async deleteOrder(req: Request, resp: Response) {
        try {
            const { orderId } = req.params;

            await prisma.order.delete({
                where: {
                    id: String(orderId)
                }
            });

            return resp.status(200).json({
                message: "Pedido deletado com sucesso",
            });

        } catch (error: any) {
            return resp.status(500).json({ message: error.message });
        }
    }
}