import { Currency, Trade, TypePay } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, MIN, Min, MinLength } from "class-validator"

export class CreateTradeDto {
    @Transform(({ value }) => new Date(value)) // Convierte la fecha al formato UTC recibiendola como string.
    @IsDate()
    date: Date;
    @IsEnum(Trade)
    @MinLength(5)
    trade: Trade
    @IsNumber()
    @Min(0)
    exchangeRate: number
    @IsNumber()
    @Min(0)
    amountForeignCurrency: number
    @IsEnum(Currency)
    currency: Currency
    @IsEnum(TypePay)
    typePay: TypePay
    @IsNumber()
    @Min(0)
    @IsOptional()
    amount: number
    @IsNumber()
    @Min(0)
    @IsOptional()
    remainingForeign: number
    @IsNumber()
    @Min(0)
    @IsOptional()
    revenue: number

}
