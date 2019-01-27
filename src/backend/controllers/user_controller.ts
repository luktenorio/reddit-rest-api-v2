import * as express from "express";
import * as joi from "joi";
import { getUserRepository } from "../repositories/userRepository";

export function getUserController() {

    const userRepository = getUserRepository();
    const router = express.Router();

    const userDetailsSchema = {
        email: joi.string().email(),
        password: joi.string()
    };

    // http://localhost:8080/api/v1/users/1
    router.get("/:id", (req, res) => {
        (async () => {
            const user = await userRepository.findOne(req.params.id,{
                relations: ["links", "votes", "comments"]
            });
            if (!user) {
                res.status(404).send();
                return;
            }
            res.json(user);
        })();
    });

    // HTTP POST http://localhost:8080/api/v1/users/
    router.post("/", (req, res) => {
        (async () => {
            const newUser = req.body;
            const result = joi.validate(newUser, userDetailsSchema);
            const userSameEmail = await userRepository.findOne({ email: newUser.email });
            if (result.error || userSameEmail) {
                res.status(400).send();
                return;
            }
            await userRepository.save(newUser);
            res.json({ ok: "ok" }).send();
        })();
    });

    return router;
}