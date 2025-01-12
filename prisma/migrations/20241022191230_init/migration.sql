/*
  Warnings:

  - You are about to drop the column `expenseId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `incomeId` on the `Income` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_incomeId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "incomeId";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_fkey" FOREIGN KEY ("id") REFERENCES "ExpenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_id_fkey" FOREIGN KEY ("id") REFERENCES "IncomeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
