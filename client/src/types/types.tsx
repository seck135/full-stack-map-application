export interface Coordinate {
    lat: number;
    lon: number;
}

export interface IPolygonCreate {
    name: string;
    coordinates: Coordinate[];
}

export interface IObjectCreate {
    name: string;
    coordinate: Coordinate;
}

export interface Polygon extends IPolygonCreate {
    id: string;
}

export interface ObjectMarker extends IObjectCreate {
    id: string;
}
