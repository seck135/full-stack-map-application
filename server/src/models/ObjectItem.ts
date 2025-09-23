import { Document, Schema, model } from "mongoose";

export interface ObjectItemDocument extends Document {
  name: string;
  geometry: { // -- GeoJSON type
    type: "Marker";                 
    coordinates: [number, number]; // [lon, lat] 
  };
  symbolType: string;
}

const objectItemSchema = new Schema<ObjectItemDocument>(
  {
    name: { type: String, required: true },
    geometry: {
      type: { type: String, enum: ["Marker"], default: "Marker" },
      coordinates: { type: [Number], required: true }, // [lon, lat]
    },
    symbolType: { type: String, default: 'default' },
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
