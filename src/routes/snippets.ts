import { Router, Request, Response } from "express";
import * as snippetService from "../services/snippets";
import mongoose, { ObjectId, isValidObjectId } from "mongoose";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { text } = req.body;

    // basic validation
    if (!text) {
        res.status(400).json({ error: "Missing text" });

        return;
    }

    try {
        // creation
        const snippet = await snippetService.create(text);

        // result
        res.status(201).json(snippet);
    } catch (error) {
        // TODO: system log should be placed here

        res.status(500).json({ error: "Sorry an unexpected error happened" });
    }
});

router.get("/:id", async (req: Request, res: Response) => {

    const id = req.params.id;

    // validations
    if(!id || isValidObjectId(id)){
        res.status(400).json({ error: "Invalid id" });

        return;
    }    

    try {
        const snippet = await snippetService.getById(id);

        res.status(201).json(snippet);
    } catch (error) {
        // TODO: system log should be placed here

        res.status(500).json({ error: "Sorry an unexpected error happened" });   
    }
});

export default router;
