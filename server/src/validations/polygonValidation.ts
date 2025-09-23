import { Request, Response, NextFunction } from "express";

// validations/polygonValidation.ts
export function validatePolygon(req: Request, res: Response, next: NextFunction) {
  const { name, geometry } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Invalid name. Name must be a non-empty string." });
  }

  if (!geometry || typeof geometry !== "object") {
    return res.status(400).json({ message: "Missing geometry object." });
  }

  if (geometry.type !== "Polygon") {
    return res.status(400).json({ message: 'Invalid geometry type. Must be "Polygon".' });
  }

  const coords = geometry.coordinates;
  if (!Array.isArray(coords) || !Array.isArray(coords[0])) {
    return res.status(400).json({ message: "Invalid coordinates. Must be an array of points." });
  }

  // check if there at least 3 points in the outer ring
  const outerRing = coords[0];
  if (outerRing.length < 3) {
    return res.status(400).json({ message: "Polygon must have at least 3 points." });
  }

  next();
}