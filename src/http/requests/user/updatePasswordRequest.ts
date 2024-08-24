import { z } from 'zod';
import UserModel from '@models/UserModel';
import CryptServices from '@services/CryptServices';

export interface IUpdatePasswordRequest {
  currentPassword: string;
  password: string;
}

export default async function (
  data: IUpdatePasswordRequest,
  email: string,
): Promise<
  z.SafeParseReturnType<IUpdatePasswordRequest, IUpdatePasswordRequest>
> {
  const validation = z.object({
    currentPassword: z
      .string()
      .min(6)
      .refine(
        async (value: string) => {
          const userModel = UserModel.instance();
          const user = await userModel.findUnique({
            where: {
              email: email,
            },
          });
          return !!user && CryptServices.decryptData(user.password) === value;
        },
        {
          message: 'Senha atual incorreta',
        },
      ),
    password: z.string().min(6),
  });
  return await validation.safeParseAsync({
    currentPassword: data.currentPassword,
    password: data.password,
  });
}
