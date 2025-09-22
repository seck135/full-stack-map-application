import { Document, Schema, model } from "mongoose";

export interface ObjectItemDocument extends Document {
    name: string;
    lat: number;
    lon: number;
}

const objectItemSchema = new Schema<ObjectItemDocument>(
    {
        name: { type: String, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
    },
    {
        collection: "objects",
        versionKey: false,
        toJSON: {
            virtuals: true, // include virtuals
            transform: (_, ret) => {
                ret.id = ret._id; // copy _id to id
                delete ret._id;   // remove _id
            },
        },
    }
);

export const ObjectItem = model<ObjectItemDocument>("ObjectItem", objectItemSchema);
