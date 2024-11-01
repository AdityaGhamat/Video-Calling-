import { Router } from "express";
import v1Routes from "./v1/index";

class ApiRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes(): void {
    this.router.use("/v1", v1Routes);
  }
}

export default new ApiRoutes().router;
