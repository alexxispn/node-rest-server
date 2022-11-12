import express from "express";
import cors from "cors";
import {AuthRouter, CategoriesRouter, UsersRouter, ProductsRouter} from "./routes/index.js";
import ConfigDb from "./database/config.db.js";


export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            authPath: '/api/auth',
            usersPath: '/api/users',
            categoriesPath: '/api/categories',
            productsPath: '/api/products',

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
        this.app.use(this.paths.usersPath, UsersRouter);
        this.app.use(this.paths.categoriesPath, CategoriesRouter);
        this.app.use(this.paths.productsPath, ProductsRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
