-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_id_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_id_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "expenseCategoryId" INTEGER;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "incomeCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_incomeCategoryId_fkey" FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
