import Database from "@config/Database";
import {Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class TodoModel extends Database{
    private constructor() {
        super();
    }
    static instance(): Prisma.TodoDelegate<DefaultArgs> {
        const instance: PrismaClient = this.getInstance();
        return instance.todo;
    }
}