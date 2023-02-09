import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  getUser,
  putUser,
  postUser,
  deleteUser,
} from "../controllers/user.controllers";

import { validate } from "../middlewares/validate";

const routerUsers = Router();
routerUsers.get("/", getUsers);
routerUsers.get("/:id", getUser);
routerUsers.post(
  "/",
  [
    //middleares
    check("name", "El nombre es obligatorio")
      .not()
      .isEmpty()
      .toLowerCase()
      .trim(),
    check("email", "El email es obligatorio, y debe ser valido")
      .isEmail()
      .toLowerCase()
      .trim(),
    check(
      "password",
      "El password es obligatorio y debe de ser como minimo 4 caracteres"
    )
      .isLength({ min: 4 })
      .trim(),
    validate,
  ],
  postUser
);
routerUsers.put("/:id", putUser);
routerUsers.delete("/:id", deleteUser);

export default routerUsers;
