export type Ticket = {
    id: string
    email: string
    orderId: string
    order: Order
    name: string | null
}

export type Order = {
    id: string
    buyerEmail: string
    amount: number
    paid: number
    batch: number
}
