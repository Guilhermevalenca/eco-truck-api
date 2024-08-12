import {NextFunction, Request, Response} from "express";

export default async function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    if (req.session.auth) {
        next();
    } else {
        res.status(401).end();
    }
}