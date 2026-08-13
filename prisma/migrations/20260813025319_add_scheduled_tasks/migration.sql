-- CreateEnum
CREATE TYPE "ScheduledTaskType" AS ENUM ('SALARY', 'RECURRING_BILL', 'GOAL_CHECK', 'AI_SCORE_UPDATE');

-- CreateEnum
CREATE TYPE "ScheduledTaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "scheduled_tasks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "ScheduledTaskType" NOT NULL,
    "payload" JSONB NOT NULL,
    "execute_at" TIMESTAMP(3) NOT NULL,
    "status" "ScheduledTaskStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scheduled_tasks_execute_at_status_idx" ON "scheduled_tasks"("execute_at", "status");

-- AddForeignKey
ALTER TABLE "scheduled_tasks" ADD CONSTRAINT "scheduled_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
