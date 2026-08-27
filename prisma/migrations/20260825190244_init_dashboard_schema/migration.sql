/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `icon` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the column `score` on the `financial_scores` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[user_id,category_id,month_year]` on the table `budgets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,month_year]` on the table `financial_scores` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `total_score` to the `financial_scores` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'OUTCOME');

-- DropIndex
DROP INDEX "notifications_user_id_created_at_idx";

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "amount_allocated" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_custom" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL,
ALTER COLUMN "icon" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "financial_scores" DROP COLUMN "score",
ADD COLUMN     "history_consistency_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "income_vs_outcome_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "investment_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "planning_adherence_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "description" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2),
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "user_dash_cards" ALTER COLUMN "target_amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- DropEnum
DROP TYPE "ScheduledTaskStatus";

-- DropEnum
DROP TYPE "ScheduledTaskType";

-- CreateIndex
CREATE UNIQUE INDEX "budgets_user_id_category_id_month_year_key" ON "budgets"("user_id", "category_id", "month_year");

-- CreateIndex
CREATE INDEX "categories_user_id_type_idx" ON "categories"("user_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "financial_scores_user_id_month_year_key" ON "financial_scores"("user_id", "month_year");

-- CreateIndex
CREATE INDEX "transactions_user_id_date_type_idx" ON "transactions"("user_id", "date", "type");

-- CreateIndex
CREATE INDEX "transactions_user_id_is_paid_is_scheduled_idx" ON "transactions"("user_id", "is_paid", "is_scheduled");
