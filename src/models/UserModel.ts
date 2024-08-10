import Database from "@config/Database";
import { PrismaClient } from "@prisma/client";

export default class UserModel extends Database{
    private constructor() {
        super();
    }
    static instance() {
        const instance: PrismaClient = this.getInstance();
        return instance.user;
    }
}