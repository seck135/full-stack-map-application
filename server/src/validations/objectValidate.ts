import { Request, Response, NextFunction } from "express";

// Middleware validation function
export function validateObjectItem(req: Request, res: Response, next: NextFunction) {
    const { name, geometry, symbolType } = req.body;
    const { type, coordinates } = geometry || {};
        console.log(name, type, coordinates, symbolType);
        
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Invalid name. Name must be a non-empty string." });
    }

    if (type !== "Marker") {
        return res.status(400).json({ message: 'Invalid geometry type. Must be "Marker".' });
    }

    if (
        !Array.isArray(coordinates) ||
        coordinates.length !== 2 ||
        typeof coordinates[0] !== "number" ||
        typeof coordinates[1] !== "number"
    ) {
        return res.status(400).json({ message: "Invalid coordinates. Must be an array of [lon, lat]." });
    }

    if (typeof symbolType !== "string") {
        return res.status(400).json({ message: "Invalid symbolType. Must be a string." });
    }

    // If everything is valid, next
    next();
}
