import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ObjectId } from "mongoose";
import { comparIdUsers } from "../utils/comparIdUsers";
interface IUserId {
  header: ObjectId;
  params: ObjectId;
}

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // manejo de errores
  const userIds: IUserId = {
    header: req.body.id,
    params: req.params.user as unknown as ObjectId,
  };
  try {
    if (userIds.header !== userIds.params) {
      throw new Error(
        "[ => Eventos del usuario] Ser detecto una inconsistencia con el id del usuario"
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Parece ser que usted no tiene permisos, hable con el administrador",
    });
  }

  return next();
};
