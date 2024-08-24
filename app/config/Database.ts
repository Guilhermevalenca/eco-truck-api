import { PrismaClient } from '@prisma/client';

export default abstract class Database {
  private static _prisma: PrismaClient | undefined;
  protected constructor() {}

  protected static getInstance(): PrismaClient {
    if (!this._prisma) {
      this._prisma = new PrismaClient();
    }
    return this._prisma;
  }
}
