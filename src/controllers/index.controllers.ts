import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response) => {
  return res.json({
    message: "page principal",
  });
};
export const getIndexAPI=(req:Request,res:Response)=>{
  return res.json({
    data:"estas en la ruta /api",
  })
}
