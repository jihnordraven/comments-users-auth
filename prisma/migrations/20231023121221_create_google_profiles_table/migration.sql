-- CreateTable
CREATE TABLE "github_profiles" (
    "sub" TEXT NOT NULL,
    "email" TEXT,
    "login" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "github_profiles_pkey" PRIMARY KEY ("sub")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_sub_key" ON "github_profiles"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_email_key" ON "github_profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_userId_key" ON "github_profiles"("userId");

-- AddForeignKey
ALTER TABLE "github_profiles" ADD CONSTRAINT "github_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
