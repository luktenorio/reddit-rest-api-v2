import express from "express";
import bodyParser from "body-parser";
import { createDbConnection } from "./db";
import { getUserController } from "./backend/controllers/user_controller";
import { getLinksController } from "./backend/controllers/link_controler";
import { getAuthController } from "./backend/controllers/auth_controller";
import { getCommentController } from "./backend/controllers/comment_controller";

export async function createApp() {

    // Create db connection
    await createDbConnection();

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Declare main path
    app.get("/", (req, res) => {
        res.send("This is the home page!");
    });

    // Declare controllers
    const usersController = getUserController();
    const linksController = getLinksController();
    const authController = getAuthController();
    const commentController = getCommentController();

    app.use("/api/v1/users", usersController);
    app.use("/api/v1/links", linksController);
    app.use("/api/v1/auth", authController);
    app.use("/api/v1/comments", commentController);

    interface Error {
        status?: number;
        message?: string;
    }  
  
    app.use((err:Error, req:express.Request, res:express.Response,next:express.NextFunction) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    return app
};