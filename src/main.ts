import express from "express";
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import env from "@config/env";
import expressConfig from "@config/expressConfig";
import RoutesServices from "@services/RoutesServices";
import SocketsServices from "@services/SocketsServices";

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

(async () => {
    //routes:
    await RoutesServices.instanceRoutes(app);

    io.on("connection", async (socket: Socket  ) => {
        await SocketsServices.instanceSockets(io,  socket);
    });

    httpServer.listen(env.PORT ?? 3000);
    console.log('start', env.PORT ?? 3000);
})();