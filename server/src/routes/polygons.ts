import { Router } from "express";
import { Polygon } from "../models/Polygon";

const router = Router();

// GET all polygons
router.get("/", async (req, res) => {
    const polygons = await Polygon.find();
    res.json(polygons);
});

// GET polygon by id
router.get("/:id", async (req, res) => {
    const polygon = await Polygon.findById(req.params.id);
    if (!polygon) return res.status(404).json({ message: "Polygon not found" });
    res.json(polygon);
});

// POST (crate) new polygon
router.post("/", async (req, res) => {
    const { name, coordinates } = req.body;
    const polygon = new Polygon({ name, coordinates });
    await polygon.save();
    res.status(201).json(polygon);
});

// PUT (update) polygon
router.put("/:id", async (req, res) => {
    const { name, coordinates } = req.body;
    const polygon = await Polygon.findByIdAndUpdate(
        req.params.id,
        { name, coordinates },
        { new: true }
    );
    if (!polygon) return res.status(404).json({ message: "Polygon not found" });
    res.json(polygon);
});

// DELETE polygon
router.delete("/:id", async (req, res) => {
    const polygon = await Polygon.findByIdAndDelete(req.params.id);
    if (!polygon) return res.status(404).json({ message: "Polygon not found" });
    res.json({ message: "Polygon deleted" });
});

export default router;
