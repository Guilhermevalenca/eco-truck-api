import { Server, Socket } from 'socket.io';

export default function (io: Server, socket: Socket): void {
  console.log(io, socket);
}
