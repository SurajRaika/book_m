import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

// Map to store active rooms
const activeRooms = new Map();

// Define the Nitro plugin
export default defineNitroPlugin((nitroApp: NitroApp) => {
  // Initialize Engine.io and Socket.io servers
  const engine = new Engine();
  const io = new Server();

  // Bind Socket.io to Engine.io
  io.bind(engine);

  // Handle connection event
  io.on("connection", (socket) => {
    // Get roomId from handshake or create a new one
    const roomId = socket.handshake.query.roomId || createNewRoomId();
    socket.rooms.forEach(room => {
      console.log(room);
      
    })
    // Join the room
    socket.join(roomId);

    // Emit event to generate room
    io.to(roomId).emit('GenerateRoom', roomId);

    // Handle BookData event
    socket.on('BookData', (data) => {
      // Emit BookData to all sockets in the room
      io.sockets.in(data.roomId).emit('BookData', data.isbn);
    });

    // Handle disconnecting event
    socket.on("disconnecting", () => {
      // Emit disconnectedEditor event and leave room for each socket
      socket.rooms.forEach(room => {
        io.to(room).emit("disconnectedEditor", "Editor Is Closed");
        socket.leave(room);
      });
    });

    // Handle ScannerConnected event
    socket.on('ScannerConnected', (roomId) => {
      console.log("..................................ScannerConnected");
      
      console.log("scannedConnection",roomId);
      socket.rooms.forEach(room => {
        console.log(room);
        
      })

      io.to(roomId).emit('ChangeToEditor');
      console.log("..................................ScannerConnected");

    });
  });

  // Define handler for Socket.io route
  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      // Handle WebSocket request using Engine.io
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // Prepare Engine.io for WebSocket
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

// Function to create a new room ID
function createNewRoomId() {
  return `${new Date().getMilliseconds().toString()}`
};
