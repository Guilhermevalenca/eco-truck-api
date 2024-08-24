import IUser from '@interfaces/IUser';
import { z } from 'zod';
import UserModel from '@models/UserModel';

export default async function (
  data: IUser,
  email: string,
): Promise<z.SafeParseReturnType<IUser, IUser>> {
  const userValidation = z.object({
    name: z.string(),
    email: z
      .string()
      .email()
      .refine(
        async (value: string) => {
          const userModel = UserModel.instance();
          return (
            email === value ||
            !(await userModel.findUnique({
              where: {
                email: value,
              },
            }))
          );
        },
        {
          message: 'Email já cadastrado!',
        },
      ),
  });
  return await userValidation.safeParseAsync({
    name: data.name,
    email: data.email,
  });
}
