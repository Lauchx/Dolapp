import { Currency } from "@prisma/client"
import { IsEnum, IsNumber, Min } from "class-validator"

export class CreateCurrencyDto {
    @IsEnum(Currency)
    currency: string
    @IsNumber()
    @Min(0)
    amount: number
    @IsNumber()
    @Min(0)
    revenue: number
}
