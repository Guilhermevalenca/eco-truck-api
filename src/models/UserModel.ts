import Database from "@config/Database";
import {Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class UserModel extends Database{
    private constructor() {
        super();
    }
    static instance(): Prisma.UserDelegate<DefaultArgs> {
        const instance: PrismaClient = this.getInstance();
        return instance.user;
    }
}