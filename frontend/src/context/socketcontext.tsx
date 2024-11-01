import { createContext, useEffect, useReducer, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "@/reducers/peerReducer";
import { addPeerAction } from "@/actions/peerActions";
interface SocketContextType {
  socket: Socket;
  user?: Peer;
  stream?: MediaStream;
  peers?: any;
}
const socket = io("http://localhost:3000");

export const SocketContext = createContext<SocketContextType>({ socket });

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, Setuser] = useState<Peer>();
  const [stream, Setstream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  const fetchMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    Setstream(stream);
  };

  const fetchParticipantList = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log(`fetching participants`);
    console.log(`${roomId}:${participants}`);
  };

  useEffect(() => {
    const newUser = uuidV4();
    const newPeer = new Peer(newUser, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    Setuser(newPeer);
    fetchMediaStream();
    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    socket.on("get-users", fetchParticipantList);
  }, []);

  useEffect(() => {
    if (!(user && stream)) return;
    socket.on("user-joined", ({ peerId }: { peerId: string }) => {
      const call = user.call(peerId, stream);
      console.log(`calling new peer of peerId ${peerId}`);
      call.on("stream", () => {
        dispatch(addPeerAction(peerId, stream));
      });
    });

    user.on("call", (call) => {
      console.log(`receiving the call`);
      call.answer(stream);
      call.on("stream", () => {
        dispatch(addPeerAction(call.peer, stream));
      });
    });
    socket.emit("ready");
  }, [user, stream]);
  return (
    <SocketContext.Provider value={{ socket, user, stream, peers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
