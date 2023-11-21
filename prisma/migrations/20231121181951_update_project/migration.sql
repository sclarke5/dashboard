/*
  Warnings:

  - Added the required column `columns` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasks` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "archivedColumns" JSONB,
ADD COLUMN     "archivedTasks" JSONB,
ADD COLUMN     "columnOrder" TEXT[],
ADD COLUMN     "columns" JSONB NOT NULL,
ADD COLUMN     "tasks" JSONB NOT NULL;
