import path from 'path';
import express, { Application } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';
import { parsequery } from "../api/middlewares/parsequery";
import session from "express-session";


import { router as userRouter } from "../api/controllers/user";
import { router as directionRouter } from "../api/controllers/direction";
import { router as imageRouter } from "../api/controllers/image";
import { router as teacherRouter } from "../api/controllers/teacher";
import { router as leaderRouter } from "../api/controllers/leader";
import { router as configRouter } from "../api/controllers/config";
import { router as pieceOfNewsRouter } from "../api/controllers/pieceofnews";
import { router as serviceRouter } from "../api/controllers/service";
import { router as i18nRouter } from "../api/controllers/i18n.controller";

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
    router.use("/image", imageRouter);
    router.use("/teacher", teacherRouter);
    router.use("/leader", leaderRouter);
    router.use("/config", configRouter);
    router.use("/pieceofnews", pieceOfNewsRouter);
    router.use("/service", serviceRouter);
    router.use("/localization", i18nRouter);

    app.use("/api/v1", router, errorHandler);

    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpecPath));

    new OpenApiValidator({
        apiSpecPath,
    }).install(app);
}