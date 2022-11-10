import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.router.js";
import UserRoutes from "./routes/users.router.js";
import CategoriesRoutes from "./routes/categories.js";
import ConfigDb from "./database/config.db.js";


export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath: '/api/auth',
            usersPath: '/api/users',
            categoriesPath: '/api/categories',

        }
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
        this.app.use(this.paths.authPath, AuthRouter);
        this.app.use(this.paths.usersPath, UserRoutes);
        this.app.use(this.paths.categoriesPath, CategoriesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
