import { createClient } from "@/lib/supabase/server"
import { Button } from "./ui/button"
import { Ticket } from "@/types/ticket"

export async function Granted({ ticket }: { ticket: Ticket }) {
    const supabase = await createClient()
    let name = ticket.name

    if (name === null) {
        const { data } = await supabase.auth.getClaims()
        if (!data || !data.claims.user_metadata) return
        name = data.claims.user_metadata.name
        await supabase.from('tickets').update({ name }).eq('id', ticket.id)
    }

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
                    <Button variant="link" className="text-[#160D18] text-lg">Fazer check-in</Button>
                    <span className="text-[#160D1866] text-sm">Temporariamente desabilitado</span>
                </div>
            </div>
        </div>
    )
}