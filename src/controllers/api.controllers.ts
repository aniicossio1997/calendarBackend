import { Request, Response } from "express";

export const getAPI = (req: Request, res: Response) => {
  res.json({
    message: "localhost",
  });
};
