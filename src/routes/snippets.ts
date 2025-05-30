import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    
    res.status(201).json({});
});

router.get("/:id", async (req: Request, res: Response) => {
    
    res.json({});
});

export default router;
