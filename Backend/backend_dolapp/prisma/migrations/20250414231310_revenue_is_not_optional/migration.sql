/*
  Warnings:

  - Made the column `remainingForeign` on table `exchangerecords` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `exchangerecords` MODIFY `remainingForeign` DOUBLE NOT NULL;
