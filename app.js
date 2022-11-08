import Server from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const app = new Server();
app.listen();
