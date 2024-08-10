import {Express, Request, Response} from "express";
import AuthMiddleware from "@middlewares/AuthMiddleware";

export default function (app: Express) {
    app.get('/me', AuthMiddleware, async (req: Request, res: Response) => {
        res.json(req.session.user).status(200);
    });
}