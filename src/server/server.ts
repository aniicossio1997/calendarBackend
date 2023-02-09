import express, { Application } from "express";
import routerUsers from "../routes/user.routes";
import cors from "cors";
import router from "../routes/index.routes";
import routerAuth from "../routes/auth.routes";
import morgan from "morgan";
import routerEvents from "../routes/events.routes";
import routerUserEvents from "../routes/userEvents.routes";
class Server {
  private app: Application;
  private port: string;
  private apiPath = {
    index: "/",
    users: "/api/users",
    events: "/api/events",
    usersEvents: "/api/users",
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    //metodo iniciales
    this.middlewares();
    //definir routes
    this.routes();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`The server is running on http://localhost:${this.port}/api`);
    });
  }
  routes() {
    this.app.use(this.apiPath.index, router);
    this.app.use(this.apiPath.events, routerEvents);
    this.app.use(this.apiPath.users, routerUsers);
    this.app.use(this.apiPath.auth, routerAuth);
    this.app.use(this.apiPath.usersEvents, routerUserEvents);
  }
  middlewares() {
    //cors
    this.app.use(morgan("dev"));

    this.app.use(cors());
    //lectura del body
    this.app.use(express.json());
    //Carpeta publica
    this.app.use(express.static("public"));
  }
}
export default Server;
