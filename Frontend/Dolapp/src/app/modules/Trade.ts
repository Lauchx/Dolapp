export class Trade{
    date: Date
    trade: string
    currency: string
    amount: number
    typePay: String

    constructor(date: Date, trade: string, currency: string, amount: number, typePay: string) {
        this.date = date;
        this.trade = trade;
        this.currency = currency;
        this.amount = amount;
        this.typePay = typePay;
    }
}
