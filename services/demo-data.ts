import type {
  AvailabilityBlock,
  CenterListing,
  Location,
  TrainerListing,
  ZipCentroid
} from "@/domain/types";

const trainerProfile = {
  id: "trainer-1",
  displayName: "Coach Mia Torres",
  bio: "Former collegiate midfielder focused on technical development and game IQ.",
  specialties: ["Ball mastery", "Speed & agility"],
  ageGroups: ["U10", "U14", "U18"],
  trainingTypes: ["1-on-1", "Small group"],
  yearsExperience: 8,
  verificationStatus: "UNVERIFIED",
  publicWebsite: "https://example.com/coach-mia",
  publicInstagram: "https://instagram.com/coachmia",
  publicContactUrl: "https://example.com/contact",
  isPublished: true
} satisfies TrainerListing["profile"];

const centerProfile = {
  id: "center-1",
  name: "Northside Soccer Center",
  description: "Indoor/outdoor training center with turf fields and futsal courts.",
  website: "https://example.com/northside",
  verificationStatus: "UNVERIFIED",
  publicContactUrl: "https://example.com/northside/contact",
  isPublished: true
} satisfies CenterListing["profile"];

const locations: Location[] = [
  {
    id: "loc-1",
    ownerType: "TRAINER",
    ownerId: trainerProfile.id,
    name: "Lakeside Park Field 3",
    city: "Austin",
    state: "TX",
    zip: "78701",
    address1: "123 Lakeside Dr",
    notes: "Meet by the blue benches.",
    fieldNumber: "3",
    lat: 30.2672,
    lng: -97.7431,
    isPublic: true,
    isActive: true
  },
  {
    id: "loc-2",
    ownerType: "CENTER",
    ownerId: centerProfile.id,
    name: "Northside Main Facility",
    city: "Denver",
    state: "CO",
    zip: "80202",
    address1: "455 Market St",
    notes: "Front desk at main entrance.",
    fieldNumber: "Indoor A",
    lat: 39.7392,
    lng: -104.9903,
    isPublic: true,
    isActive: true
  }
];

const availability: AvailabilityBlock[] = [
  {
    id: "avail-1",
    ownerType: "TRAINER",
    ownerId: trainerProfile.id,
    locationId: "loc-1",
    dayOfWeek: 2,
    startTime: "17:00",
    endTime: "19:00",
    timezone: "America/Chicago",
    isActive: true
  },
  {
    id: "avail-2",
    ownerType: "CENTER",
    ownerId: centerProfile.id,
    locationId: "loc-2",
    dayOfWeek: 4,
    startTime: "18:00",
    endTime: "20:00",
    timezone: "America/Denver",
    isActive: true
  }
];

export const demoListings = {
  trainers: [
    {
      profile: trainerProfile,
      locations: locations.filter((loc) => loc.ownerId === trainerProfile.id),
      availability: availability.filter((block) => block.ownerId === trainerProfile.id)
    }
  ],
  centers: [
    {
      profile: centerProfile,
      locations: locations.filter((loc) => loc.ownerId === centerProfile.id),
      availability: availability.filter((block) => block.ownerId === centerProfile.id)
    }
  ]
};

export const demoZips: ZipCentroid[] = [
  { zip: "78701", lat: 30.2711, lng: -97.7437, city: "Austin", state: "TX" },
  { zip: "80202", lat: 39.7525, lng: -104.9995, city: "Denver", state: "CO" },
  { zip: "94110", lat: 37.7487, lng: -122.4158, city: "San Francisco", state: "CA" }
];
