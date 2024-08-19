import {Express, Request, Response} from "express";
import AuthMiddleware from "@middlewares/AuthMiddleware";
import UserController from "@controllers/UserController";

export default function (app: Express): void {
    const userController: UserController = UserController.instance();
    app.route('/user')
        .get(AuthMiddleware, userController.show)
        .put(AuthMiddleware, userController.updateProfile)
        .patch(AuthMiddleware, userController.updatePassword)
        .delete(AuthMiddleware, userController.delete);
}