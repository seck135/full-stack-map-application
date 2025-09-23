export type Coordinate = [number, number];

export interface IObjectCreate {
  name: string;
  // GeoJSON type
  geometry: {
    type: string;
    coordinates: Coordinate; // [lon, lat] 
  };
  symbolType: string;
}

export interface IPolygonCreate {
  name: string;
  // GeoJSON type
  geometry: {
    type: string;
    coordinates: Coordinate[][]; // array of rings, each ring is array of points
  };
}

export interface ObjectMarker extends IObjectCreate {
  id: string;
}

export interface Polygon extends IPolygonCreate {
  id: string;
}
