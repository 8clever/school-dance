import { userService } from '../services/user.service';
import { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
  status: number = 500;
  message: "Internal Server Error";

  constructor (message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const checkAccess = (req: Request, res: Response, next: NextFunction) => {
  const err = new ServerError("Unauthorized", 403);
  userService.isLoggedin(req.headers.token as string).then(user => {
    if (!user) throw err;
    next();
  }).catch(next);
}