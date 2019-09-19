import path from 'path';
import express, { Application } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';
import { parsequery } from "../api/middlewares/parsequery";
import session from "express-session";


import { router as userRouter } from "../api/controllers/user";
import { router as directionRouter } from "../api/controllers/direction";
import { router as performanceRouter } from "../api/controllers/performance";
import { router as imageRouter } from "../api/controllers/image";
import { router as eventRouter } from "../api/controllers/event";
import { router as teacherRouter } from "../api/controllers/teacher";

export const openapi = (app: Application) => {
    const apiSpecPath = path.join(__dirname, 'api.yml');
    const router = express.Router();

    router.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));

    router.use(parsequery)
    router.use("/user", userRouter);
    router.use("/direction", directionRouter);
    router.use("/performance", performanceRouter);
    router.use("/image", imageRouter);
    router.use("/event", eventRouter);
    router.use("/teacher", teacherRouter);

    app.use("/api/v1", router, errorHandler);

    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpecPath));

    new OpenApiValidator({
        apiSpecPath,
    }).install(app);
}