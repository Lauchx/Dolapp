import { IsIn, IsString, Min } from "class-validator"

export class CreateCurrencyDto {
    @IsIn(['ARS', 'USD', 'EUR', 'BRL'], {
        message: 'La moneda debe ser una de las siguientes: ARS, USD, EUR, BRL',
      })
    currency: string
    @IsString()
    @Min(0)
    amount: number
    @IsString()
    @Min(0)
    revenue: number
}
