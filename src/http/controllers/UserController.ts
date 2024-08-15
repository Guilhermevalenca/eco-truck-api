import { Request, Response } from "express";
import IUser from "@interfaces/IUser";
import updateProfileRequest from "@requests/user/updateProfileRequest";
import UserModel from "@models/UserModel";
import updatePasswordRequest, {IUpdatePasswordRequest} from "@requests/user/updatePasswordRequest";
import CryptServices from "@services/CryptServices";

export default class UserController {
    private static _instance: UserController | undefined;
    private constructor() {}

    static instance() {
        if(!this._instance) {
            this._instance = new UserController();
        }
        return this._instance;
    }
    async show(req: Request, res: Response): Promise<void> {
        res.status(200)
            .json(req.session.user)
            .end();
    }
    async updateProfile(req: Request, res: Response): Promise<void> {
        const data: IUser = req.body as IUser;
        const validation = await updateProfileRequest(data, String(req.session.user?.email));
        if (validation.success) {
            const userModel = UserModel.instance();
            const user = await userModel.update({
                where: {
                    email: validation.data.email,
                },
                data: {
                    name: validation.data.name,
                    email: validation.data.email,
                }
            });
            req.session.user = user;
            res.status(200)
                .json({
                ...validation,
                data: {
                    ...user,
                    password: undefined
                }
            })
                .end();
        } else {
            res.status(400)
                .json(validation.error.formErrors.fieldErrors)
                .end();
        }
    }
    async updatePassword(req: Request, res: Response): Promise<void> {
        const validation = await updatePasswordRequest(req.body as IUpdatePasswordRequest, String(req.session.user?.email));
        if (validation.success) {
            const userModel = UserModel.instance();
            await userModel.update({
                where: {
                    email: req.session.user?.email
                },
                data: {
                    password: CryptServices.encryptData(validation.data.password)
                }
            });
            res.status(204)
                .end();
        } else {
            res.status(400)
                .json(validation.error.formErrors.fieldErrors)
                .end();
        }
    }
}