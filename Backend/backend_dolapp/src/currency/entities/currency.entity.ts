// Entidad, sirve como modelo de datos. 
export class Currency {
        currency: string
        amount: number
        constructor(currency: string, amount: number) {
                this.currency = currency
                this.amount = amount
        }
}
