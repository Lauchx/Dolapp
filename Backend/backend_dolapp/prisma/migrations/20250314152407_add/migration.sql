/*
  Warnings:

  - You are about to alter the column `trade` on the `exchangerecords` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - The values [REA] on the enum `CurrencyRevenue_currency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `exchangerecords` MODIFY `trade` ENUM('Compra', 'Venta', 'Retiro') NOT NULL,
    MODIFY `currency` ENUM('ARS', 'USD', 'EUR', 'BRL') NOT NULL;

-- CreateTable
CREATE TABLE `CurrencyRevenue` (
    `currency` ENUM('ARS', 'USD', 'EUR', 'BRL') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `revenue` DOUBLE NOT NULL,

    PRIMARY KEY (`currency`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
