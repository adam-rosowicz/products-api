import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const authorization =
  () => (req: Request, _res: Response, next: NextFunction) => {
    const key = req.header("x-api-key");

    if (!key || key !== process.env.AUTH_API_KEY) {
      throw new UnauthorizedError();
    }

    next();
  };
