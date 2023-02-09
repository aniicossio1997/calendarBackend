import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface IVerify {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  x-token headers
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader?.includes("Bearer")) {
    return res.status(401).json({
      ok: false,
      msg: "UPS el header nececita la palabra clave Bearer o el no hay token para validar",
    });
  }
  const token = authHeader && authHeader.split(" ")[1];
  console.log("toquen de validate token: ", token);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as IVerify;
    console.log("PAYPOAD VALIDATE", payload);
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
  // try {
  //   throw new Error("error");
  // } catch (error) {
  //   console.log(error);
  // }

  next();
};
