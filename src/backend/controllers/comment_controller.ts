import * as express from "express";
import * as joi from "joi";
import { getCommentRepository } from "../repositories/commentRepository";
import { authMiddleware } from "../middleware/middleware";

export function getCommentController() {

    const commentRepository = getCommentRepository();
    const router = express.Router();

    const commentDetailsSchema = {
        textfield: joi.string(),
        link: { id: joi.number() }
    };

    const commentDetaislSchemaPut = { textfield: joi.string() };

    // HTTP POST http://localhost:8080/api/v1/comments/
    router.post("/", authMiddleware, (req, res) => {
        (async () => {
            const user_Id = (req as any).userId;
            const postComment = req.body;            
            const result = joi.validate(postComment, commentDetailsSchema);
            if (result.error) {
                res.status(400).send();
                return;
            }
            postComment.user = { id: user_Id };
            res.json(await commentRepository.save(postComment));
        })();
    });

    // HTTP PUT http://localhost:8080/api/v1/comments/1
    router.put("/:id", authMiddleware, (req, res) => {
        (async () => {
            const userId = (req as any).userId;
            const newComment = req.body;
            const result = joi.validate(req.body, commentDetaislSchemaPut);

            if (result.error) {
                res.status(400).send();
                return;
            }

            let commentBase = await commentRepository.findOne(req.params.id, { relations: ["user"] });
            
            if (!commentBase) {
                res.status(404).send({ msg: "Comment not found!" });
                return;
            }

            if (commentBase.user.id !== userId) {
                res.status(400).send({ msg: "You are not the owner of the comment!" });
                return;
            }
            
            commentBase.textfield = newComment.textfield;
            await commentRepository.save(commentBase);
            res.json({ ok: "ok" });
        })();
    });

    // HTTP DELETE http://localhost:8080/api/v1/comments/1
    router.delete("/:id", authMiddleware, (req, res) => {
        (async () => {
            const userId = (req as any).userId;
            const id = req.params.id;
            const c = await commentRepository.findOne(id, { relations: ["user"]});
            if (!c) {
                res.status(404).send("not found");
                return ;
            }
            if (c.user.id !== userId) {
                res.status(400).send("you do not have permission");
                return;
                
            }
            res.json(await commentRepository.delete(id));
        })();
    });

    return router;
}