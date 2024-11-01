import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import ApiRoutes from "./routes/index";
import logger from "./config/logger-config";
import SocketSetup from "./lib/socket/setup/socket-setup";

class SocketServer {
  private app = express();
  private server = http.createServer(this.app);
  private socketSetup: SocketSetup;

  constructor() {
    this.config();
    this.routes();
    this.socketSetup = new SocketSetup(this.server);
    this.initSockets();
  }

  public start(port: number) {
    this.server.listen(port, () => {
      logger.info(`server is running and started at http://localhost:${port}`);
    });
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.get("/", (_req: Request, res: Response) => {
      res.json({ message: "Home Page" });
    });
    this.app.use("/api", ApiRoutes);
  }

  private initSockets() {
    this.socketSetup.getIO();
  }
}

export default new SocketServer();
