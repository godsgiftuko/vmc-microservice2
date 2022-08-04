import http, { createServer } from "http";
import express from "express";
import cors from "cors";
import userRoutes from "./routes";
// interfaces
import { Request, Response, Application, NextFunction, IRouter } from "./interfaces";
// configs
import { APP_VAR } from "./configs";

const PORT: number = APP_VAR.serverPort;
const app: Application = express();
const router: IRouter = express.Router();

const httpServer = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // HTTP RULES
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            return res.status(200).json({});
        }
        next();
        console.log(`${req.method} http:localhost:${PORT}${req.baseUrl}${req.path}`);
    });

    // API STATUS CHECK
    app.get("/ping", (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: "Pong!" }));

    // ROUTES
    app.use("/api/user", userRoutes(router));
    // HANDLE NOT FOUND ROUTES
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error("Not found");

        res.status(404).json({ message: error.message });
    });

    const httpServer = createServer(app).listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
};

httpServer();
