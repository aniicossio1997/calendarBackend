import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { ObjectId } from "mongoose";
import { comparIdUsers } from "../utils/comparIdUsers";
interface IEventDates {
  start: Date;
  end: Date;
}

export const validateDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // manejo de errores
  const startMoment = moment(moment(req.body.start).format("LLLL"));
  const endMoment = moment(moment(req.body.end).format("LLLL"));
  console.log(
    `Inicio: ${moment(req.body.start).format("MM/DD/YYYY HH:mm")}`,
    `fin: ${moment(req.body.end).format("MM/DD/YYYY HH:mm")}`
  );
  const dateStart = Date.parse(req.body.start);
  const dateEnd = Date.parse(req.body.end);
  console.log(
    `Inicio: ${moment(dateStart).format("MM/DD/YYYY HH:mm")}`,
    `fin: ${moment(dateEnd).format("MM/DD/YYYY HH:mm")}`,
    moment(dateStart).isSameOrAfter(endMoment)
  );
  try {
    console.log(!endMoment.isSameOrAfter(startMoment));
    if (!endMoment.isSameOrAfter(startMoment)) {
      throw new Error(
        "[ ERROR Evento => La fecha de fin debe ser superior a la de inicio"
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Verifique que la fecha de fin sea mayor a la de inicio",
    });
  }

  return next();
};
