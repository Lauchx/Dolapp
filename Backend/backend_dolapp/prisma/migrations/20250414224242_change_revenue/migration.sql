/*
  Warnings:

  - You are about to drop the column `revenue` on the `currencyrevenue` table. All the data in the column will be lost.
  - Made the column `exchangeRate` on table `exchangerecords` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amountForeignCurrency` on table `exchangerecords` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `currencyrevenue` DROP COLUMN `revenue`;

-- AlterTable
ALTER TABLE `exchangerecords` ADD COLUMN `linkedTo` VARCHAR(191) NULL,
    ADD COLUMN `remainingForeign` DOUBLE NULL,
    ADD COLUMN `revenue` DOUBLE NULL,
    MODIFY `exchangeRate` DOUBLE NOT NULL,
    MODIFY `amountForeignCurrency` DOUBLE NOT NULL;
