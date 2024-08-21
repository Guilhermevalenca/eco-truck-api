import Database from "@config/Database";
import {Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class PostModel extends Database{
    private constructor() {
        super();
    }
    static instance(): Prisma.PostDelegate<DefaultArgs> {
        const instance: PrismaClient = this.getInstance();
        return instance.post;
    }
}