-- CreateTable
CREATE TABLE `ExchangeRecords` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `trade` VARCHAR(191) NOT NULL,
    `exchangeRate` DOUBLE NULL,
    `amountForeignCurrency` DOUBLE NULL,
    `amount` DOUBLE NOT NULL,
    `currency` ENUM('ARS', 'USD', 'EUR', 'REA') NOT NULL,
    `typePay` ENUM('Transferencia', 'Efectivo') NOT NULL DEFAULT 'Efectivo',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
