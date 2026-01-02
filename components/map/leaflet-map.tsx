"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { Location } from "@/domain/types";
import { defaultMapProvider } from "@/adapters/map-provider";

const trainerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
});

const centerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  className: "leaflet-center-icon"
});

export function LeafletMap({
  locations,
  onBoundsChange
}: {
  locations: Location[];
  onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
}) {
  const center = locations[0]
    ? [locations[0].lat, locations[0].lng]
    : [39.5, -98.35];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={locations.length ? 6 : 4}
      scrollWheelZoom
      className="h-full w-full rounded-xl"
      whenCreated={(map) => {
        map.on("moveend", () => {
          const bounds = map.getBounds();
          onBoundsChange?.({
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest()
          });
        });
      }}
    >
      <TileLayer attribution={defaultMapProvider.attribution} url={defaultMapProvider.tileUrl} />
      <MarkerClusterGroup chunkedLoading>
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={location.ownerType === "CENTER" ? centerIcon : trainerIcon}
          >
            <Popup>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{location.name}</p>
                <p>
                  {location.city}, {location.state}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
