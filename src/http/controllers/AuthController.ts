import { Request, Response } from 'express';
import IUser from '@interfaces/IUser';
import loginRequest from '@requests/auth/loginRequest';
import UserModel from '@models/UserModel';
import CryptServices from '@services/CryptServices';
import registerRequest from '@requests/auth/registerRequest';

export default class AuthController {
  private static _instance: AuthController | undefined;
  private constructor() {}
  static instance() {
    if (!this._instance) {
      this._instance = new AuthController();
    }
    return this._instance;
  }
  async login(req: Request, res: Response): Promise<void> {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const data: IUser = req.body as IUser;
    const validation = await loginRequest(data);

    if (validation.success) {
      const userModel = UserModel.instance();
      const user = await userModel.findUnique({
        where: {
          email: validation.data.email,
        },
      });
      if (!user) {
        res
          .status(401)
          .json({
            success: false,
          })
          .end();
        return;
      }
      if (
        CryptServices.decryptData(user.password) === validation.data.password
      ) {
        req.session.auth = true;
        req.session.user = user;
        res
          .status(200)
          .json({
            ...validation,
            data: {
              ...user,
              password: undefined,
            },
          })
          .end();
      } else {
        res
          .status(401)
          .json({
            success: false,
          })
          .end();
      }
    } else {
      req.session.auth = false;
      res.status(400).json(validation.error.formErrors.fieldErrors).end();
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    const data: IUser = req.body as IUser;
    const validation = await registerRequest(data);

    if (validation.success) {
      const userModel = UserModel.instance();
      await (async () => {
        const user = await userModel.create({
          data: {
            name: String(data.name),
            email: data.email,
            password: CryptServices.encryptData(String(data.password)),
          },
        });
        req.session.auth = true;
        req.session.user = user;
        res
          .status(201)
          .json({
            ...validation,
            data: {
              ...user,
              password: undefined,
            },
          })
          .end();
      })().catch((error) => {
        res.status(400).json(error.message).end();
      });
    } else {
      req.session.auth = false;
      res.status(400).json(validation.error.formErrors.fieldErrors).end();
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    req.session.auth = false;
    req.session.user = undefined;
    res.status(200).end();
  }
  async isLogged(req: Request, res: Response): Promise<void> {
    res
      .status(200)
      .json({
        isLogged: !!req.session.user && !!req.session.user.id,
      })
      .end();
  }
}
