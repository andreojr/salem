import { createClient } from "@/lib/supabase/server"
import { Ticket } from "@/types/ticket"
import { Checkin } from "./checkin"
import { Button } from "./ui/button"
import { Vote } from "./vote"
import { Fantasy } from "@/types/fantasy"

export async function Granted({ ticket }: { ticket: Ticket }) {
    const supabase = await createClient()
    let name = ticket.name

    if (name === null) {
        const { data } = await supabase.auth.getClaims()
        if (!data || !data.claims.user_metadata) return
        name = data.claims.user_metadata.name
        await supabase.from('tickets').update({ name }).eq('id', ticket.id)
    }

    const { data } = await supabase.from('fantasies').select('id, description, fantasies_ticket_id_fkey(name)').neq('ticket_id', ticket.id)
    const fantasies = (data || []) as unknown as Fantasy[]

    return (
        <div className="grid gap-4">
            <p className="text-2xl">Ingresso disponível</p>
            <div>
                <div className="ticket-shape flex py-4 px-8 text-[#160D18] justify-between !rounded-b-none">
                    <div className="text-left">
                        <p className="font-bold text-xl">Coven Pass ({ticket.order.batch > 0 ? `${ticket.order.batch}º lote` : "Pré-venda"})</p>
                        <p className="text-base">{name} ({ticket.email})</p>
                    </div>
                </div>
                <div className="border-t border-dashed border-[#160D18] bg-[#C4B9B7] text-[#160D18] p-4 rounded-b-3xl flex flex-col">
                    {!ticket.checkin_done
                        ? <Checkin ticket={ticket} />
                        : <Button variant="link" className="text-[#160D18] text-lg" disabled>Check-in realizado!</Button>}
                </div>
            </div>

            {ticket.checkin_done && (
                <div className="flex flex-col gap-2">
                    <p>Concurso de fantasias</p>
                    <Vote ticket={ticket} fantasies={fantasies} />
                </div>
            )}
        </div>
    )
}