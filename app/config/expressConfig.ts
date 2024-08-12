import express, {Express} from "express";
import cors from "cors";
import env from "./env";
import session from 'express-session';

export default function (app: Express): void {
    app.use(express.json());
    app.use(cors({
        origin: env.CORS,
        credentials: true,
    }));
    app.use(session({
        secret: env.SECRET_KEY ?? 'secret default',
        resave: true,
        saveUninitialized: true
    }));
}