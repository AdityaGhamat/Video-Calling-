import { Server, Socket } from "socket.io";
// import logger from "../../../config/logger-config";
import http from "http";
import RoomHandler from "../events/socket-events";

class SocketSetup {
  private io: Server;
  private roomHandler!: RoomHandler;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.socketMethods();
  }

  private socketMethods() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`user connected`);
      this.socketEvents(socket);
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  private socketEvents(socket: Socket) {
    this.roomHandler = new RoomHandler(socket);
  }

  public getIO() {
    return this.io;
  }
}

export default SocketSetup;
