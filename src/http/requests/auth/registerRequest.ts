import IUser from '@interfaces/IUser';
import { z } from 'zod';
import UserModel from '@models/UserModel';

export default async function (
  data: IUser,
): Promise<z.SafeParseReturnType<IUser, IUser>> {
  const userValidation = z.object({
    name: z.string(),
    email: z
      .string()
      .email()
      .refine(
        async (email: string) => {
          const userModel = UserModel.instance();
          return !(await userModel.findUnique({
            where: { email },
          }));
        },
        {
          message: 'Email já cadastrado!',
        },
      ),
    password: z.string().min(6),
  });
  return await userValidation.safeParseAsync({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}
