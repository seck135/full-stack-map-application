import { Router } from "express";
import { Polygon } from "../models/Polygon";

const router = Router();

// GET כל הפוליגונים
router.get("/", async (req, res) => {
    const polygons = await Polygon.find();
    res.json(polygons);
});

// GET פוליגון לפי id
router.get("/:id", async (req, res) => {
    const polygon = await Polygon.findById(req.params.id);
    if (!polygon) return res.status(404).json({ message: "Polygon not found" });
    res.json(polygon);
});

// POST יצירת פוליגון חדש
router.post("/", async (req, res) => {
    const { name, coordinates } = req.body;
    const polygon = new Polygon({ name, coordinates });
    await polygon.save();
    res.status(201).json(polygon);
});

// PUT עדכון פוליגון
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

// DELETE מחיקת פוליגון
router.delete("/:id", async (req, res) => {
    const polygon = await Polygon.findByIdAndDelete(req.params.id);
    if (!polygon) return res.status(404).json({ message: "Polygon not found" });
    res.json({ message: "Polygon deleted" });
});

export default router;
