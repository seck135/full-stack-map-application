export interface LatLng {
    lat: number;
    lng: number;
}

export interface IPolygonCreate {
    name: string;
    coordinates: LatLng[];
}

export interface IObjectCreate {
    name: string;
    coordinate: LatLng;
}

export interface Polygon extends IPolygonCreate {
    id: string;
}

export interface ObjectMarker extends IObjectCreate {
    id: string;
}
