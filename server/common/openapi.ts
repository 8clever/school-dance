import path from 'path';
import express, { Application } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';
import { router as userRouter } from "../api/controllers/user/router";
import session from "express-session";

export const openapi = (app: Application) => {
    const apiSpecPath = path.join(__dirname, 'api.yml');
    

    const router = express.Router();
    router.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    
    router.use("/user", userRouter);

    app.use("/api/v1", router, errorHandler);

    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpecPath));

    new OpenApiValidator({
        apiSpecPath,
    }).install(app);
}