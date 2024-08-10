import {Request,  Response} from "express";
import IUser from "@interfaces/IUser";
import loginRequest from "@requests/auth/loginRequest";
import UserModel from "@models/UserModel";
import CryptServices from "@services/CryptServices";
import registerRequest from "@requests/auth/registerRequest";

export default class AuthController {
    private static _instance: AuthController | undefined;
    private constructor() {}
    static instance() {
        if (!this._instance) {
            this._instance = new AuthController();
        }
        return this._instance;
    }
    async login(req: Request, res: Response) {
        const data: IUser = req.body as IUser;
        const validation = await loginRequest(data);

        if (validation.success) {
            const userModel = UserModel.instance();
            const user = await userModel.findUnique({
                where: {
                    email: validation.data.email
                },
            });
            if(!user) {
                res.json({
                    success: false,
                })
                    .status(401).end();
                return;
            }
            if (CryptServices.decryptData(user.password) === validation.data.password) {
                req.session.auth = true;
                req.session.user = user;
                res.json({
                    ...validation,
                    data: {
                        ...user,
                        password: undefined
                    }
                })
                    .status(200).end();
            } else {
                res.json({
                    success: false
                })
                    .status(401).end();
            }
        } else {
            req.session.auth = false;
            res.json(validation.error.message)
                .status(400).end();
        }
    }
    async register(req: Request, res: Response) {
        const data: IUser = req.body as IUser;
        const validation = await registerRequest(data);

        if (data.name && data.email && data.password) {
            if(validation.success) {
                const userModel = UserModel.instance();
                try {
                    const user = await userModel.create({
                        data: {
                            name: data.name,
                            email: data.email,
                            password: CryptServices.encryptData(data.password)
                        }
                    });
                    req.session.auth = true;
                    req.session.user = user;
                    res.json({
                        ...validation,
                        data: {
                            ...user,
                            password: undefined
                        }
                    })
                        .status(201).end();
                } catch (error: any) {
                    res.json(error.message)
                        .status(400).end();
                }
            } else {
                req.session.auth = false;
                res.json(validation.error.message)
                    .status(400).end();
            }
        } else {
            req.session.auth = false;
            res.json({
                success: false
            })
                .status(400).end();
        }
    }
    async logout(req: Request, res: Response) {
        req.session.auth = false;
        req.session.user = undefined;
        res.status(200).end();
    }
}