import IUser from '@interfaces/IUser';
import {z} from 'zod';

export default async function (data: IUser):  Promise<z.SafeParseReturnType<IUser, IUser>> {
    const userValidation = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    return await userValidation.safeParseAsync({
        email: data.email,
        password: data.password,
    });
}