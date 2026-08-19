import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";


export class TelephoneController{
    
    public static async createTelephone(req:Request, resp:Response){
        try{
            const {userId,phoneNumber,DDD} = req.body
            if(!userId){
                return resp.status(400).json({ error: "O ID do usuário é obrigatório"});
            }
            const foundUser = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })

            if(!foundUser){
                return resp.status(404).json({ error: "Usuário não encontrado." });
            }

            const foundTelephone = await prisma.telephone.findUnique({
                where:{
                    userId:userId
                }
            })
            if(foundTelephone){
                return resp.status(400).json({ error: "Este usuário já possui um telefone cadastrado."});
            }
            const createdTelephone = await prisma.telephone.create({
                data:{
                    DDD,
                    phoneNumber,
                    user:{
                        connect:{id: userId} 
                    }
                }
            })

            return resp.status(201).json({Message:"Telefone criado com sucesso ",id:createdTelephone})

                            
        }
        catch(error:any){
            return resp.status(500).json({message:error.message});

        }
    }

    public static async readTelephone(req:Request, resp:Response){
        try{
                const {userId} = req.params;

                if(!userId){
                    return resp.status(400).json({ error: "O ID do usuário é obrigatório"});
                }

                const foundTelephone = await prisma.telephone.findUnique({
                    where:{
                        userId:String(userId)
                    }
                })
                return resp.status(200).json(foundTelephone);

        }
        catch(error:any){
            return resp.status(500).json({message:error.message});
        }
    }


    public static async readAllTelephones(req:Request, resp:Response){
        try{
            const phoneNumbers = await prisma.telephone.findMany()
            return resp.status(200).json(phoneNumbers);
        }
        catch(error:any){
            return resp.status(500).json({message:error.message});
        }
    }


    public static async updateTelephone(req:Request, resp:Response){
        try{
            const {userId} = req.params
            const {DDD,phoneNumber} = req.body
            if(!userId){
                return resp.status(400).json({ error: "O ID do usuário é obrigatório"});
            }
            let updateData: Prisma.TelephoneUpdateInput = {
                DDD,
                phoneNumber,
            };

            const updatedTelephone= await prisma.telephone.update({
                where:{
                    userId:String(userId)
                },
                data:updateData,
            });
            return resp.status(200).json({
            message: "Telefone atualizado com sucesso",
            user: updatedTelephone
        });

        }catch(error:any){
            
            return resp.status(404).json({message:error.message});
        }

    }

    public static async deleteTelephone(req:Request, resp:Response){
        try{
            const {userId} = req.params
            
            if(!userId){
                return resp.status(400).json({ error: "O ID do usuário é obrigatório"});
            }


            await prisma.telephone.delete({
                where:{
                    userId:String(userId),
                }
            })

            return resp.status(200).json({ 
            message: "Telefone deletado com sucesso",
        });

        }catch(error:any){
            if(error.code === 'P2025'){
                return resp.status(404).json({ message: "Usuário não encontrado" });
            }
                return resp.status(500).json({message:error.message});
        }

    }

} 
