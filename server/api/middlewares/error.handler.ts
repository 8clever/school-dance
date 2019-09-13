import { Request, Response, NextFunction } from 'express';

export interface ExpressError extends Error {
  errors?: Error[],
  status?: number
}

// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(err: ExpressError, req: Request, res: Response, next: NextFunction) {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors })
}

