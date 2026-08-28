import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";
import auth from "../config/auth"
import { Mailer } from "../config/mailer";



export class UserController{

    public static async createUser(req:Request, resp:Response){
        try{
            console.log("CORPO QUE CHEGOU:", req.body);
            
            const {firstName,lastName,email,smsNotification,marketingEmails,orderUpdates,
                newArrivals,emailNotification,salesAlerts,password} = req.body

            const{hash,salt} = auth.generatePassword(password)

            const createData = {
                firstName,
                lastName,
                email,
                cart: {
                    create:{}
                },
                ...(smsNotification !== undefined && { smsNotification }),
                ...(marketingEmails !== undefined && { marketingEmails }),
                ...(orderUpdates !== undefined && { orderUpdates }),
                ...(newArrivals !== undefined && { newArrivals }),
                ...(emailNotification !== undefined && { emailNotification }),
                ...(salesAlerts !== undefined && { salesAlerts }),
                hash,
                salt,
            }

            const createdUser = await prisma.user.create({data:createData})

            await Mailer.sendEmail(
                email,
                "Welcome to Style Marketplace",
                "Thank you for joining Style Marketplace! We are excited to have you with us.",
            );

            return resp.status(201).json({Message:"Usuariario criado com sucesso ",id:createdUser})
                
        }
        catch(error:any){
            return resp.status(500).json({message:error.message});

        }
    }

    public static async readUser(req:Request, resp:Response){
        try{
            const {userId} = req.params

            const foundUser = await prisma.user.findUnique({
                where:{ 
                    id:String(userId)
                }, include: {
                    _count: {
                        select: {
                            order: true
                        }
                    }
                }
            })
            return resp.status(200).json(foundUser);

        }
        catch(error:any){
            return resp.status(500).json({message:error.message});
        }
    }


    public static async readAllUsers(req:Request, resp:Response){
        try{

            const users = await prisma.user.findMany()

            return resp.status(200).json(users);

        }
        catch(error:any){
            return resp.status(500).json({message:error.message});
        }
    }


    public static async updateUser(req:Request, resp:Response){
        try{
            const {userId} = req.params;
            const {firstName,lastName,email,gender,birthDate,password} = req.body

            let updateData: Prisma.UserUpdateInput = {
                firstName,
                lastName,
                email,
                gender,
            };
            if (birthDate) {
                updateData.birthDate = new Date(birthDate);
            }

            const updatedUser = await prisma.user.update({
                where:{ 
                    id:String(userId)
                },

                data:updateData,
                select:{
                    firstName:true,
                    lastName:true,
                    email:true,
                    smsNotification:true,
                    marketingEmails:true,
                    orderUpdates:true,
                    newArrivals:true,
                    gender:true,
                    birthDate:true,
                    memberSince:true,
                    emailNotification:true,
                }

            });
            return resp.status(200).json({
            message: "Usuário atualizado com sucesso",
            user: updatedUser
        });

        }catch(error:any){

            if (error.code === 'P2025'){
                return resp.status(404).json({ message: "Usuário não encontrado para deleção" });
            }
                return resp.status(404).json({message:error.message});
        }

    }

    public static async deleteUser(req:Request, resp:Response){
        try{
            const {userId} = req.params
            
            await prisma.user.delete({
                where:{ 
                    id:String(userId)
                }
            });
        
            return resp.status(200).json({ 
            message: "Usuário deletado com sucesso",
        });

        }catch(error:any){
            if(error.code === 'P2025'){
                return resp.status(404).json({ message: "Usuário não encontrado" });
            }
                return resp.status(500).json({message:error.message});
        }

    }

    public static async login(req:Request, resp:Response){

        try{

            const {email,password} = req.body
            const user = await prisma.user.findUnique({
                where: {email: email} 
            });

            if(!user){
                return resp.status(404).json({ message: "Usuário não encontrado" });
            }
            if(auth.checkPassword(password,user.hash,user.salt)){
                const token = auth.generateJWT(Number(user.id));
                return resp.status(200).json({token:token, userId: user.id})
            }
            
            return resp.status(401).json({message:"Senha ou email incorretos"});

        }
        catch(error:any){
            return resp.status(500).json({message:error.message})
        }

    }

}