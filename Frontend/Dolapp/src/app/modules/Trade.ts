export class Trade{
    date: string // Pasa al back como string y lo convierte alli mismo al formato UTC que es el que usa prisma. 
    trade: string
    currency: string
    amountForeignCurrency: number
    typePay: string
    exchangeRate: number
    //remainingForeign: number
    revenue: number


    constructor(date: string, trade: string, currency: string, amountForeignCurrency: number, typePay: string, exchangeRate:number) {
        this.date = date
        this.trade = trade
        this.currency = currency
        this.amountForeignCurrency = amountForeignCurrency
        this.typePay = typePay
        this.exchangeRate = exchangeRate
        this.revenue = this.revenue
    }
}
