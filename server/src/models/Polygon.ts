import { Schema, model, Document } from "mongoose";

export interface PolygonDocument extends Document {
  name: string;
  geometry: {
    type: "Polygon";           // GeoJSON type
    coordinates: [number, number][][]; // [[[lon, lat], [lon, lat], ...]]
  };
}

const polygonSchema = new Schema<PolygonDocument>(
  {
    name: { type: String, required: true },
    geometry: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // array of array of [lon, lat]
        required: true,
      },
    },
  },
  {
    collection: "polygons",
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id; 
      },
    },
  }
);

export const Polygon = model<PolygonDocument>("Polygon", polygonSchema);
