import {join} from "path";
import {Server, Socket} from "socket.io";
import Services from "@services/Services";

export default class SocketsServices extends Services {
    static async instanceSockets(io: Server, socket: Socket) {
        try {
            const instanceDirectory = this.instanceDirectory('../../src/sockets');
            for (let file of instanceDirectory.files) {
                await import(join(instanceDirectory.directory, file)).then(module => module.default(io, socket));
            }
        } catch (error: any) {
            throw error;
        }
    }
}