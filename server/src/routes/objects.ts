import { Router } from "express";
import { ObjectItem } from "../models/ObjectItem";
import { validateObjectItem } from "../validations/objectValidate";

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
router.post("/", validateObjectItem, async (req, res) => {
    const { name, geometry, symbolType } = req.body;
    const objectItem = new ObjectItem({
        name,
        geometry,
        symbolType
    });
    await objectItem.save();
    res.status(201).json(objectItem);
});

// PUT (update) object
router.put("/:id", validateObjectItem, async (req, res) => {
    const { name, geometry, symbolType } = req.body;
    const objectItem = await ObjectItem.findByIdAndUpdate(
        req.params.id,
        {
            name,
            geometry,
            symbolType
        },
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
