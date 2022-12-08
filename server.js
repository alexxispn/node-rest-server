import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import {
    AuthRouter,
    CategoriesRouter,
    ProductsRouter,
    SearchRouter,
    UploadsRouter,
    UsersRouter
} from "./routes/index.js";
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
            searchPath: '/api/search',
            uploadsPath: '/api/uploads',

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
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.authPath, AuthRouter);
        this.app.use(this.paths.usersPath, UsersRouter);
        this.app.use(this.paths.categoriesPath, CategoriesRouter);
        this.app.use(this.paths.productsPath, ProductsRouter);
        this.app.use(this.paths.searchPath, SearchRouter);
        this.app.use(this.paths.uploadsPath, UploadsRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
