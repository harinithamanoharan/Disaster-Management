-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'VICTIM',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HelpRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requesterId" TEXT,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "locationName" TEXT,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "peopleAffected" INTEGER NOT NULL DEFAULT 1,
    "priorityScore" REAL NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "aiVerificationStatus" TEXT NOT NULL DEFAULT 'NEEDS_VERIFICATION',
    "aiTags" TEXT,
    "smsSource" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HelpRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResourceOffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "volunteerId" TEXT,
    "type" TEXT NOT NULL,
    "quantity" TEXT,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "locationName" TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResourceOffer_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
