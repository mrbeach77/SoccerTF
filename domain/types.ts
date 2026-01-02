export type OwnerType = "TRAINER" | "CENTER";

export interface TrainerProfile {
  id: string;
  displayName: string;
  bio: string;
  specialties: string[];
  ageGroups: string[];
  trainingTypes: string[];
  yearsExperience?: number;
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED";
  publicWebsite?: string;
  publicInstagram?: string;
  publicContactUrl?: string;
  isPublished: boolean;
}

export interface CenterProfile {
  id: string;
  name: string;
  description: string;
  website?: string;
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED";
  publicContactUrl?: string;
  isPublished: boolean;
}

export interface Location {
  id: string;
  ownerType: OwnerType;
  ownerId: string;
  name: string;
  city: string;
  state: string;
  zip?: string | null;
  address1?: string | null;
  address2?: string | null;
  notes?: string | null;
  fieldNumber?: string | null;
  lat: number;
  lng: number;
  isPublic: boolean;
  isActive: boolean;
}

export interface AvailabilityBlock {
  id: string;
  ownerType: OwnerType;
  ownerId: string;
  locationId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
  isActive: boolean;
}

export interface ZipCentroid {
  zip: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface TrainerListing {
  profile: TrainerProfile;
  locations: Location[];
  availability: AvailabilityBlock[];
}

export interface CenterListing {
  profile: CenterProfile;
  locations: Location[];
  availability: AvailabilityBlock[];
}
