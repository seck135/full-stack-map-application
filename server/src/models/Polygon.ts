import { Schema, model, Document } from "mongoose";

interface Coordinate {
    lat: number;
    lon: number;
}

export interface PolygonDocument extends Document {
    name: string;
    coordinates: Coordinate[];
}

const polygonSchema = new Schema<PolygonDocument>(
    {
        name: { type: String, required: true },
        coordinates: [
            {
                lat: { type: Number, required: true },
                lon: { type: Number, required: true }
            }
        ]
    },
    { collection: "polygons", versionKey: false }
);

export const Polygon = model<PolygonDocument>("Polygon", polygonSchema);
