import serverConfig from "./config/server-config";
import server from "./server";

server.start(Number(serverConfig.PORT));
