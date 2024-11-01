import { Router } from "express";

class v1Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes(): void {}
}

export default new v1Routes().router;
