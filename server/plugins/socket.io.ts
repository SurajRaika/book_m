import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

const activeRooms = new Map();

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    const roomId = createNewRoomId();

    socket.join(roomId);

    io.to(roomId).emit('GenerateRoom', roomId);

    // // console.log("new client", roomId);
    // socket.on('GenerateRoom', () => {
    //   console.log('GenerateRoom');
    //   const roomId = createNewRoomId();
    //   // joinRoom(socket, roomId);
    //   // socket.join(roomId);
    //   io.emit('GenerateRoom', roomId);
    // })



    socket.on('BookData', (data) => {
      console.log('BookData', data.roomId);
      io.sockets.in(data.roomId).emit('BookData', data.isbn);
    });



    socket.on('ScannerConnected', (roomId) => {
      console.log('ScannerConnected', roomId);
      // io.sockets.in(data.roomId).emit('BookData', data.isbn);
      io.to(roomId).emit('ChangeToEditor');
    });
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});

// function joinRoom(socket, roomId) {
//   socket.join(roomId);
//   activeRooms.set(roomId, activeRooms.get(roomId) || new Set());
//   activeRooms.get(roomId).add(socket.id);
//   // console.log(`Client ${socket.id} joined room ${roomId}`);
// }

function createNewRoomId() {
  return `${new Date().getMilliseconds().toString()}`;
}
