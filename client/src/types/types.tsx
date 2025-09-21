export interface LatLng {
    lat: number;
    lng: number;
}

export interface Polygon {
    id: string;
    name: string;
    coordinates: LatLng[];
}

export interface ObjectMarker {
    id: string;
    name: string;
    coordinate: LatLng;
}
