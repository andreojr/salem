import { createClient } from "@/lib/supabase/server"
import { LoginGoogle } from "./login-google"
import { Shopping } from "./shopping"
import { Ticket as TicketType } from "@/types/ticket"
import { Granted } from "./granted"
import { getCurrentBatch, getAmountOfTicketsSold } from "@/lib/utils"

export async function Ticket() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()

    const amountOfticketsSold = await getAmountOfTicketsSold(supabase)

    const ticket = await supabase.from('tickets').select('*').eq('email', data?.claims.email || '').single()
    let ticketFormatted: TicketType | null = null
    let order
    if (ticket.data) {
        order = await supabase.from('orders').select('*').eq('id', ticket.data.orderId).single()
        ticketFormatted = { ...ticket.data, order: order.data }
    }

    if (!data) {
        return (
            <LoginGoogle />
        )
    }

    const claims = data.claims

    if (ticketFormatted && ticketFormatted.order && ticketFormatted.order.paid !== null && ticketFormatted.order.batch !== null) {
        return <Granted ticket={ticketFormatted} />
    }

    return (
        <Shopping email={claims.email} ticket={ticketFormatted} batch={getCurrentBatch(amountOfticketsSold)} />
    )
}