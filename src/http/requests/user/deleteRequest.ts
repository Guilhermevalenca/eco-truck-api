import IUser from "@interfaces/IUser";
import {z} from "zod";
import UserModel from "@models/UserModel";
import CryptServices from "@services/CryptServices";

export default async function (data: IUser) {
    const validation = z.object({
        password: z.string().min(6).refine(async (value: string) => {
            const userModel = UserModel.instance();
            const user = await userModel.findUnique({
                where: {
                    email: data.email
                }
            });
            return !!user && value === CryptServices.decryptData(user.password);
        })
    });
    return validation.safeParseAsync({
        password: data.password
    });
}