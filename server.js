import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./routes/users.router.js";
import ConfigDb from "./database/config.db.js";

dotenv.config();

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.connectDb();
        this.middlewares();
        this.routes();
    }

    connectDb() {
        ConfigDb();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, UserRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
