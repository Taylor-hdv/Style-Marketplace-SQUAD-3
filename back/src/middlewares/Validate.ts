import {Request, Response, NextFunction} from "express"
import {ZodSchema} from "zod"



export const validate = (schema: ZodSchema) => {
    return (req:Request, resp:Response, next:NextFunction) => {
        const validation = schema.safeParse(req.body)

        if(!validation.success){
            return resp.status(400).json({
                message:"Erro ao validar os dados",
                errors: validation.error.issues});
        }
        req.body = validation.data;
        next()
    }
}