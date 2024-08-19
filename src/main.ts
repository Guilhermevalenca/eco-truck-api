import express, {Request,  Response} from "express";
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import env from "@config/env";
import expressConfig from "@config/expressConfig";
import RoutesServices from "@services/RoutesServices";
import SocketsServices from "@services/SocketsServices";
import IUser from "@interfaces/IUser";

declare module "express-session" {
    interface SessionData {
        auth: boolean | null | undefined;
        user: IUser | null | undefined;
    }
}

//instances
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: env.CORS,
    }
});

//config express:
expressConfig(app);

async function startedServer(): Promise<void> {
    //import routes:
    await RoutesServices.instanceRoutes(app);

    io.on("connection", async (socket: Socket  ) => {
        //import sockets
        await SocketsServices.instanceSockets(io,  socket);
    });

    httpServer.listen(Number(env.PORT) ?? 3000);
}

startedServer()
    .then(() => {
        console.log('start', env.PORT ?? 3000);
    })