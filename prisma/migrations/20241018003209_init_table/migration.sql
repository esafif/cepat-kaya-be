-- CreateTable
CREATE TABLE "user" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "employee" (
    "employeeID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "shiftHours" TEXT NOT NULL,
    "managerID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employeeID")
);

-- CreateTable
CREATE TABLE "store" (
    "userID" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "storeManagerID" TEXT NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_managerID_fkey" FOREIGN KEY ("managerID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_storeManagerID_fkey" FOREIGN KEY ("storeManagerID") REFERENCES "employee"("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;
