import {Express, Request, Response} from "express";
import AuthController from "@controllers/AuthController";
import AuthMiddleware from "@middlewares/AuthMiddleware";

export default function (app: Express): void {
    const authController = AuthController.instance();

    app.post('/login', authController.login);
    app.post('/register', authController.register);
    app.post('/logout', AuthMiddleware, authController.logout);
    app.get('/isLogged', authController.isLogged);

}