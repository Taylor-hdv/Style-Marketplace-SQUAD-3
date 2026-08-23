import { Request, Response, NextFunction } from 'express';
import auth from '../config/auth';

export class AuthMiddleware {
    public static execute(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Erro no formato do token' });
        }

        const [scheme, token] = parts as [string, string];

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Token mal formatado' });
        }

        try {
            const decoded = auth.decodeJWT(token);
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    }
}