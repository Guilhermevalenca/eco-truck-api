import {Express} from "express";
import {readdirSync} from "fs";
import {join} from 'path';

export default class RoutesServices {

    static async instanceRoutes(app: Express) {
        try {
            const directory = join(__dirname, '../../src/routes');
            const files = readdirSync(directory);
            for (let file of files) {
                await import(join(directory, file)).then(module => module.default(app));
            }
        } catch (error: any) {
            throw error;
        }
    }
}
