-- CreateEnum
CREATE TYPE "ScheduledTaskType" AS ENUM ('SALARY', 'RECURRING_BILL', 'GOAL_CHECK', 'AI_SCORE_UPDATE');

-- CreateEnum
CREATE TYPE "ScheduledTaskStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'GOAL';
