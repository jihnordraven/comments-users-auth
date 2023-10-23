-- CreateTable
CREATE TABLE "google_profiles" (
    "sub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "google_profiles_pkey" PRIMARY KEY ("sub")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_sub_key" ON "google_profiles"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_email_key" ON "google_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_userId_key" ON "google_profiles"("userId");

-- AddForeignKey
ALTER TABLE "google_profiles" ADD CONSTRAINT "google_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
