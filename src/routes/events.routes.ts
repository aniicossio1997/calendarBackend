//routes protegidas por el token jwt

import { Router } from "express";
import * as Controller from "../controllers/events.controllers";

const routerEvents = Router();
routerEvents.get("/", Controller.getAll);

export default routerEvents;
