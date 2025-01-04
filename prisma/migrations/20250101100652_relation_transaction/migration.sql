-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "category"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "account"("accountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "category"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
