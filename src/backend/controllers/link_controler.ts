import * as express from "express";
import * as joi from "joi";
import { getLinkRepository } from "../repositories/linkRepository";
import { authMiddleware } from "../middleware/middleware";
import { getVoteRepository } from "../repositories/voteRepository";
import { Link } from "../entities/Link";
import { Repository } from "typeorm";


export function getHandlers(linkRepo: Repository<Link>) {

    const linksDetailsSchema = {
        url: joi.string(),
        title: joi.string()
    };

    const postNewLinkHandler = (req: express.Request, res: express.Response) => {
        
        (async () => {
            const user_Id = (req as any).userId;
            const newLink = req.body;            
            const result = joi.validate(newLink, linksDetailsSchema);

            if (result.error) {
                res.status(400).send();
                return;
            }
            newLink.user = { id: user_Id };
            var link = await linkRepo.save(newLink);
            res.json(link);
        })();
    }

    return {
        postNewLinkHandler: postNewLinkHandler
    };
}

export function getLinksController() {

    const linkRepository = getLinkRepository();
    const voteRepository = getVoteRepository();
    const handlers = getHandlers(linkRepository);
    const router = express.Router();

    // HTTP GET http://localhost:8080/api/v1/links/
    router.get("/", (req, res) => {
        (async () => {
            const link = await linkRepository.find();
            res.json(link);
        })();
    });

    // HTTP GET http://localhost:8080/api/v1/links/1
    router.get("/:id", (req, res) => {
        (async () => {
            res.json(await linkRepository.findOne(req.params.id, {relations: ["comments", "votes"]}));
        })();
    });

    // HTTP POST http://localhost:8080/api/v1/links/
    router.post("/", authMiddleware, handlers.postNewLinkHandler);

    // HTTP DELETE http://localhost:8080/links/1
    router.delete("/:id", authMiddleware, (req, res) => {
        (async () => {
            const id = req.params.id;
            const userId = (req as any).userId;
            var link = await linkRepository.findOne(id, { relations: ["user"] })
            if (link) {
                if (link.user.id == userId) {
                    res.json(await linkRepository.delete(id));
                } else {
                    res.status(400).send("You're not the owner");
                }
            } else {
                res.status(404).send("Not found");
            }
        })();
    });

    // HTTP POST http://localhost:8080/links/:id/upvote
    router.post("/:id/upvote", authMiddleware, (req, res) => {
        (async () => {
            const user_Id = (req as any).userId;
            const id = parseInt(req.params.id);
            var voteInBD = await voteRepository.findOne({ user: { id: user_Id }, link: { id: id }});
            if (voteInBD) {
                res.status(404).send({ msg: "You've already voted" });
                return;
            }
            const vote = { user: { id: user_Id }, link: { id: id }, vote: true };
            const voted = await voteRepository.save(vote);
            res.json(voted);
        })();
    });

    // HTTP POST http://localhost:8080/links/:id/upvote
    router.post("/:id/downvote", authMiddleware, (req, res) => {
        (async () => {
            const user_Id = (req as any).userId;
            const id = parseInt(req.params.id);
            var voteInBD = await voteRepository.findOne({ user: { id: user_Id }, link: { id: id }});
            if (voteInBD) {
                res.status(404).send({ msg: "You've already voted" });
                return;
            }
            const vote = { user: { id: user_Id }, link: { id: id }, vote: false };
            const voted = await voteRepository.save(vote);
            res.json(voted);
        })();
    });

    return router;
}