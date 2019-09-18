import { Request, Response, NextFunction} from "express";

const re = /json_/;

export const parsequery = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;

  Object.keys(query).forEach(k => {
    try {
      if (!re.test(req.query[k])) return;
      const str = req.query[k].replace(re, "");
      query[k] = JSON.parse(str);
    } catch (e) {}
  });

  req.query = query;
  next();
}