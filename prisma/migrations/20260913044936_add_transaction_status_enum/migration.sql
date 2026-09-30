/*
  Warnings:

  - You are about to drop the column `is_paid` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_scheduled` on the `transactions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PAID', 'SCHEDULED', 'PLANNED');

-- DropIndex
DROP INDEX "transactions_user_id_is_paid_is_scheduled_idx";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "is_paid",
DROP COLUMN "is_scheduled",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PAID';

-- CreateIndex
CREATE INDEX "transactions_user_id_date_status_idx" ON "transactions"("user_id", "date", "status");
