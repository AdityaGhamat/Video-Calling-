import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";
import { IRoomsParams } from "../../../types/IRoomsParams";
import rooms from "../singleton/roomhandler";

class RoomHandler {
  private roomId: string;
  private socket: Socket;
  constructor(socket: Socket) {
    this.roomId = uuidV4();
    this.socket = socket;
    this.socketListeners();
  }

  private socketListeners() {
    this.socket.on("create-room", () => this.createRoom());
    this.socket.on("join-room", ({ roomId, peerId }: IRoomsParams) =>
      this.joinedRoom(roomId, peerId)
    );
  }

  private createRoom() {
    const roomId = this.roomId;
    rooms[roomId] = [];
    console.log(`created room`);
    this.socket.join(roomId);
    this.socket.emit("room-created", { roomId });
    console.log(`room created with room Id:${roomId}`);
  }

  private joinedRoom(roomId: string, peerId: string) {
    if (rooms[roomId]) {
      console.log(`New ${peerId} user has joined the room ${roomId}`);
      rooms[roomId].push(peerId);
      this.socket.join(roomId);
    }
    this.socket.on("ready", () => {
      this.socket.to(roomId).emit("user-joined", { peerId });
    });
    this.socket.emit("get-users", {
      roomId,
      participants: rooms[roomId],
    });
  }
}

export default RoomHandler;
