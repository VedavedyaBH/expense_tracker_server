/*
  Warnings:

  - The `date` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Income` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `today` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "today",
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Expense_date_idx" ON "Expense"("date");

-- CreateIndex
CREATE INDEX "Income_date_idx" ON "Income"("date");
