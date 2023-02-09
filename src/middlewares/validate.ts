import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

// parallel processing
export const validate = (req: Request, res: Response, next: NextFunction) => {
  // manejo de errores
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: "Hay campos que son requeridos",
      errors: errors.mapped(),
    });
  }

  return next();
};
