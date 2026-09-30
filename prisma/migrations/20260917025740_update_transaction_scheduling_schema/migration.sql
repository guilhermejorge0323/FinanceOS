-- CreateEnum
CREATE TYPE "RecurrenceOption" AS ENUM ('NONE', 'MONTHLY', 'YEARLY');

-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'PENDING';

-- DropIndex
DROP INDEX "transactions_user_id_date_status_idx";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "due_date" DATE,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "recurrence" "RecurrenceOption" NOT NULL DEFAULT 'NONE',
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "transactions_user_id_status_due_date_idx" ON "transactions"("user_id", "status", "due_date");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
