import { Router } from "express";
import { ObjectItem } from "../models/ObjectItem";

const router = Router();

// GET all objects
router.get("/", async (req, res) => {
    const objects = await ObjectItem.find();
    res.json(objects);
});

// GET object by id
router.get("/:id", async (req, res) => {
    const objectItem = await ObjectItem.findById(req.params.id);
    if (!objectItem) return res.status(404).json({ message: "Object not found" });
    res.json(objectItem);
});

// POST (create) new object
router.post("/", async (req, res) => {
    const { name, lat, lon } = req.body;
    const objectItem = new ObjectItem({ name, lat, lon });
    await objectItem.save();
    res.status(201).json(objectItem);
});

// PUT (update) object
router.put("/:id", async (req, res) => {
    const { name, lat, lon } = req.body;
    const objectItem = await ObjectItem.findByIdAndUpdate(
        req.params.id,
        { name, lat, lon },
        { new: true }
    );
    if (!objectItem) return res.status(404).json({ message: "Object not found" });
    res.json(objectItem);
});

// DELETE object
router.delete("/:id", async (req, res) => {
    const objectItem = await ObjectItem.findByIdAndDelete(req.params.id);
    if (!objectItem) return res.status(404).json({ message: "Object not found" });
    res.json({ message: "Object deleted" });
});

export default router;
