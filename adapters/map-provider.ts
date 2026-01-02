export interface MapTileProvider {
  name: string;
  tileUrl: string;
  attribution: string;
}

export const defaultMapProvider: MapTileProvider = {
  name: "OpenStreetMap",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "&copy; OpenStreetMap contributors"
};

export const mapProviderRegistry: MapTileProvider[] = [defaultMapProvider];
