import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "@/context/socketcontext";
import UserFeedPlayer from "@/components/UserFeedPlayer";
const Room = () => {
  const { id } = useParams();
  const { socket, user, stream, peers } = useContext(SocketContext);
  useEffect(() => {
    if (user) socket.emit("join-room", { roomId: id, peerId: user.id });
  }, [user, id, socket, peers]);

  return (
    <div>
      Room:{id}
      <h1>Your Feed</h1>
      <UserFeedPlayer stream={stream!} />
      <div>
        <h2>Other users feed</h2>
        <br />
        {Object.keys(peers).map((peerId) => (
          <>
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Room;
