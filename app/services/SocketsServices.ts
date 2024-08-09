import {join} from "path";
import {readdirSync} from "fs";
import {Server, Socket} from "socket.io";

export default class SocketsServices {
    static async instanceRoutes(io: Server, socket: Socket) {
        try {
            const directory = join(__dirname, '../../src/sockets');
            const files = readdirSync(directory);
            for (let file of files) {
                await import(join(directory, file)).then(module => module.default(io, socket));
            }
        } catch (error: any) {
            throw error;
        }
    }
}