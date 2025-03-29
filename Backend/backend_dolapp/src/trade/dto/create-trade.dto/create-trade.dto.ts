import { Currency, Trade, TypePay } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, Min } from "class-validator"

export class CreateTradeDto {
    @Transform(({ value }) => new Date(value)) // Convierte la fecha al formato UTC recibiendola como string.
    @IsDate()
    date: Date;
    @IsEnum(Trade)
    trade: Trade
    @IsEnum(Currency)
    currency: Currency
    @IsNumber()
    @Min(0)
    @IsOptional()
    amount: number
    @IsEnum(TypePay)
    typePay: TypePay
    @IsNumber()
    @Min(0)
    exchangeRate: number
    @IsNumber()
    @Min(0)
    amountForeignCurrency: number
}
