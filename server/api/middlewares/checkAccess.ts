import { userService } from '../services/user.service';
import { NextFunction, Request, Response } from "express";
import { ServerError } from './error.handler';

export const checkAccess = (req: Request, res: Response, next: NextFunction) => {
  const err = new ServerError("Unauthorized", 403);
  userService.isLoggedin(req.headers.token as string).then(user => {
    if (!user) throw err;
    next();
  }).catch(next);
}