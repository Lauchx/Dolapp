import { Currency } from "@prisma/client"
import { IsEnum, IsNumber, Min } from "class-validator"

export class CreateCurrencyDto {
    @IsEnum(Currency)
    currency: Currency
    @IsNumber()
    @Min(0)
    amount: number
    constructor(currency:Currency, amount:number){
        this.currency = currency
        this.amount = amount
    }
}
