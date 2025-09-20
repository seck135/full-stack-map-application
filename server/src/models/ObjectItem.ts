import { Document, Schema, model } from "mongoose";

export interface ObjectItemDocument extends Document {
    name: string;
    lat: number;
    lon: number;
}

const objectItemSchema = new Schema<ObjectItemDocument>({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});

export const ObjectItem = model<ObjectItemDocument>("ObjectItem", objectItemSchema);
