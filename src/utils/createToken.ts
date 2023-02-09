import jwt from "jsonwebtoken";
import config from "../config/config";

export const createToken = (id: string, email: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email };
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

export const createTokenWithRedis = (id: string, email: string) => {};
