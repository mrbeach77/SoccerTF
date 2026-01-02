-- Create enums
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'TRAINER', 'CENTER_ADMIN');
CREATE TYPE "OwnerType" AS ENUM ('TRAINER', 'CENTER');
CREATE TYPE "VerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING', 'VERIFIED');
CREATE TYPE "AvailabilityExceptionStatus" AS ENUM ('CANCELED', 'MOVED');
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'IN_REVIEW', 'RESOLVED', 'DISMISSED');

-- Create tables
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "role" "UserRole" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TrainerProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "specialties" TEXT[] NOT NULL,
  "ageGroups" TEXT[] NOT NULL,
  "trainingTypes" TEXT[] NOT NULL,
  "yearsExperience" INTEGER,
  "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
  "publicWebsite" TEXT,
  "publicInstagram" TEXT,
  "publicContactUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "TrainerProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CenterProfile" (
  "id" TEXT NOT NULL,
  "ownerUserId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "website" TEXT,
  "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
  "publicContactUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CenterProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Location" (
  "id" TEXT NOT NULL,
  "ownerType" "OwnerType" NOT NULL,
  "ownerId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "zip" TEXT,
  "address1" TEXT,
  "address2" TEXT,
  "notes" TEXT,
  "fieldNumber" TEXT,
  "lat" DOUBLE PRECISION NOT NULL,
  "lng" DOUBLE PRECISION NOT NULL,
  "isPublic" BOOLEAN NOT NULL DEFAULT true,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AvailabilityBlock" (
  "id" TEXT NOT NULL,
  "ownerType" "OwnerType" NOT NULL,
  "ownerId" TEXT NOT NULL,
  "locationId" TEXT NOT NULL,
  "dayOfWeek" INTEGER NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "timezone" TEXT NOT NULL,
  "recurrenceRule" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "AvailabilityBlock_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AvailabilityException" (
  "id" TEXT NOT NULL,
  "availabilityBlockId" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "status" "AvailabilityExceptionStatus" NOT NULL,
  "note" TEXT,

  CONSTRAINT "AvailabilityException_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Media" (
  "id" TEXT NOT NULL,
  "ownerType" "OwnerType" NOT NULL,
  "ownerId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "type" TEXT NOT NULL,

  CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Report" (
  "id" TEXT NOT NULL,
  "reporterEmail" TEXT,
  "targetType" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  "details" TEXT,
  "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ZipCentroid" (
  "zip" TEXT NOT NULL,
  "lat" DOUBLE PRECISION NOT NULL,
  "lng" DOUBLE PRECISION NOT NULL,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,

  CONSTRAINT "ZipCentroid_pkey" PRIMARY KEY ("zip")
);

CREATE TABLE "Review" (
  "id" TEXT NOT NULL,
  "ownerType" "OwnerType" NOT NULL,
  "ownerId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "TrainerProfile_userId_key" ON "TrainerProfile"("userId");
CREATE UNIQUE INDEX "CenterProfile_ownerUserId_key" ON "CenterProfile"("ownerUserId");
CREATE INDEX "Location_state_city_idx" ON "Location"("state", "city");
CREATE INDEX "Location_lat_lng_idx" ON "Location"("lat", "lng");
CREATE INDEX "ZipCentroid_state_city_idx" ON "ZipCentroid"("state", "city");
CREATE INDEX "Review_owner_idx" ON "Review"("ownerType", "ownerId");

-- Foreign keys
ALTER TABLE "TrainerProfile" ADD CONSTRAINT "TrainerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CenterProfile" ADD CONSTRAINT "CenterProfile_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Location" ADD CONSTRAINT "location_trainer_fk" FOREIGN KEY ("ownerId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Location" ADD CONSTRAINT "location_center_fk" FOREIGN KEY ("ownerId") REFERENCES "CenterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "AvailabilityBlock_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "availability_trainer_fk" FOREIGN KEY ("ownerId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AvailabilityBlock" ADD CONSTRAINT "availability_center_fk" FOREIGN KEY ("ownerId") REFERENCES "CenterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AvailabilityException" ADD CONSTRAINT "AvailabilityException_availabilityBlockId_fkey" FOREIGN KEY ("availabilityBlockId") REFERENCES "AvailabilityBlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Media" ADD CONSTRAINT "media_trainer_fk" FOREIGN KEY ("ownerId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Media" ADD CONSTRAINT "media_center_fk" FOREIGN KEY ("ownerId") REFERENCES "CenterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
