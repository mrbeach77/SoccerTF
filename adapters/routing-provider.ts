export interface RoutingProvider {
  getDrivingDistance(params: {
    originLat: number;
    originLng: number;
    destLat: number;
    destLng: number;
  }): Promise<{ distanceMiles: number; durationMinutes: number }>;
}

export const routingProvider: RoutingProvider = {
  async getDrivingDistance() {
    throw new Error(
      "Driving distance is not implemented for MVP v1. Configure a routing provider (Mapbox, Google, ORS) to enable."
    );
  }
};
