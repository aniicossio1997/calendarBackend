import { Router } from "express";
import * as Controller from "../controllers/userEvents.controllers";
import { validateToken } from "../middlewares/validateToken";
import { check, CustomSanitizer, param } from "express-validator";
import { validate } from "../middlewares/validate";
import { isValidDate } from "../utils/isValidDate";
import { ObjectId } from "mongoose";
import { validateUser } from "../middlewares/validateUser";
import { validateDate } from "../middlewares/validateDate";
const toObjectId: CustomSanitizer = (value: any) => {
  return value as ObjectId;
};
const routerUserEvents = Router();
//para validar todos los token
//routerUserEvents.use(validateToken);
routerUserEvents.get(
  "/:user/events",
  param("user").customSanitizer(toObjectId),
  Controller.getEvents
);
routerUserEvents.post(
  "/:user/events",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check(
      "start",
      "La fecha de inicio es obligatoria y debe de ser valida"
    ).custom(isValidDate),
    check("end", "La fecha de fin es obligatoria y debe ser valida").custom(
      isValidDate
    ),
    check("user_id", "el id de usuario debe de ser obligatorio").notEmpty(),
    validate,
    validateDate,
    validateToken,
  ],

  Controller.postEvent
);
routerUserEvents.get("/:user/events/:id", Controller.getEvent);
routerUserEvents.put(
  "/:user/events/:id",
  param("user").customSanitizer(toObjectId),
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check(
      "start",
      "La fecha de inicio es obligatoria y debe de ser valida"
    ).custom(isValidDate),
    check("end", "La fecha de fin es obligatoria y debe ser valida").custom(
      isValidDate
    ),
    validate,
    validateDate,
    validateToken,
  ],
  Controller.putEvent
);
routerUserEvents.delete(
  "/:user/events/:id",
  [validateToken],
  Controller.deleteEvent
);
export default routerUserEvents;
