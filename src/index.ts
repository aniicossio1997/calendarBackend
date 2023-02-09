import dotenv from "dotenv";
import "./database";
import Server from "./server/server";
//confi dotenv
dotenv.config();
const server = new Server();
server.listen();
