import { Router } from "express";
import { getIndex ,getIndexAPI} from "../controllers/index.controllers";

const routerIndex = Router();
routerIndex.get("", getIndex);
routerIndex.get("/api", getIndexAPI)

export default routerIndex;
