export interface EarthquakeApi {
    type: string

    data: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
    };

    features:EarthquakeFeature[];
}
export interface EarthquakeFeature {
  id: string;

    properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tsunami: number;
    alert: string | null;
    title: string;
    url: string;
  };

  geometry: {
    type: string;
    coordinates: number[];
  };
}