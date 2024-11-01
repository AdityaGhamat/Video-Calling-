import { SocketContext } from "@/context/socketcontext";
import { Button } from "./ui/button";
import { useContext } from "react";

const RoomJoin = () => {
  const { socket } = useContext(SocketContext);
  const init_Room = () => {
    socket.emit("create-room");
  };
  return (
    <Button className="" onClick={init_Room}>
      Create New Room
    </Button>
  );
};

export default RoomJoin;
