import { Router } from "express";
import { check } from "express-validator";
import { authMe, login } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate";
import { validateToken } from "../middlewares/validateToken";
const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    //middleares
    check("email", "El email es obligatorio, y debe ser valido")
      .isEmail()
      .toLowerCase()
      .trim(),
    check("password", "El password es obligatorio").not().isEmpty().trim(),
    validate,
  ],

  login
);
routerAuth.post("/me", authMe);
export default routerAuth;
