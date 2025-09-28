'use client'

import { useEffect, useState } from "react"
import { Cart } from "./cart"
import { Checkout } from "./checkout"
import { createClient } from "@/lib/supabase/client"
import { Ticket } from "@/types/ticket"
import { getTicketPrice } from "@/lib/utils"

export function Shopping({ email, ticket, batch }: { email: string, ticket: Ticket | null, batch: number }) {
    const payment_amount = useState(0)
    const [pay, setPay] = payment_amount

    useEffect(() => {
        if (ticket && ticket.order && ticket.order.amount > 0) {
            setPay(ticket.order.amount * getTicketPrice(batch))
        }
    }, [setPay, ticket, batch])

    async function handleCancel() {
        try {
            const supabase = createClient()
            if (ticket && ticket.order && ticket.order.amount > 0)
                await supabase.from('orders').delete().eq('id', ticket.order.id)
            setPay(0)
        } catch {}
    }
    
    return pay == 0 ? <Cart email={email} payment_amount={payment_amount} batch={batch} /> : <Checkout email={email} payment_amount={payment_amount} handleCancel={handleCancel} />
}