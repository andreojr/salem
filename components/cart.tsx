'use client'

import { Dispatch, SetStateAction, useState } from "react"
import '@/styles/ticket-shape.css'
import { Button } from "./ui/button"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { getTicketPrice } from "@/lib/utils"

export function Cart({ email, payment_amount, batch }: { email: string, payment_amount: [number, Dispatch<SetStateAction<number>>], batch: number }) {
    const [tickets, setTickets] = useState<string[]>([email])
    const [, setPay] = payment_amount
    const soldOut = batch === -1

    function getTotalPrice() {
        return getTicketPrice(batch) * tickets.length
    }

    function updateTicketEmail(index: number, email: string) {
        const temp_tickets = [...tickets]
        temp_tickets[index] = email
        setTickets(temp_tickets)
    }

    function handleAddTicket() {
        setTickets([...tickets, ""])
    }

    function handleRemoveTicket(email: string) {
        const temp_tickets = [...tickets]
        temp_tickets.splice(temp_tickets.indexOf(email), 1)
        setTickets(temp_tickets)
    }

    function toGmail(email: string) {
        const name = email.split('@')[0].trim()
        return `${name}@gmail.com`
    }

    async function handleBuy() {
        try {
            const supabase = createClient()
            const order = await supabase.from('orders').insert([
                { buyerEmail: email, amount: tickets.length }
            ]).select().single()
            if (order.error || !order.data)
                throw order.error

            await supabase.from('tickets').insert([
                ...tickets.map((e) => ({ email: toGmail(e), orderId: order.data.id }))
            ])

            setPay(getTotalPrice())
        } catch (e) {
            console.log('Erro ao criar pedido')
            console.log(e)
        }
    }

    return (
        <div className="p-2 grid gap-4">
            <div className="flex items-center justify-between">
                <p className="text-2xl">Sacola</p>
                {!soldOut && <span>{tickets.length} ingresso{tickets.length != 1 && 's'}</span>}
            </div>
            {!soldOut && (
                <div className="grid gap-2">
                    {tickets.map((e, i) => (
                        <div key={i} className="ticket-shape flex py-4 px-8 text-[#160D18] justify-between">
                            <div className="text-left">
                                <p className="font-bold text-base">Coven Pass ({batch > 0 ? `${batch}º lote` : "Pré-venda"})</p>
                                {e != email && (
                                    <div className="text-sm">
                                        <input
                                            placeholder="Informe o e-mail"
                                            className="bg-transparent border-b border-[#160D18] placeholder:text-[#160D1866] outline-none w-40"
                                            value={e}
                                            onChange={(evt) => updateTicketEmail(i, evt.target.value.replace(/\s/g, '').toLowerCase())}
                                        />
                                        <span>@gmail.com</span>
                                    </div>
                                )}
                                {e == email && <p className="text-sm">{e}</p>}
                            </div>
                            <div className="flex flex-col justify-between">
                                <p>{getTicketPrice(batch).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                {e != email && <span className="text-sm text-red-800 cursor-pointer" onClick={() => handleRemoveTicket(e)}>Remover</span>}
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={handleAddTicket}>
                        Adicionar Ingresso
                    </Button>
                </div>
            )}
            {!soldOut && <Separator className="bg-[#663666]" />}
            <div className="grid gap-2">
                {!soldOut && (
                    <div className="flex items-center justify-between">
                        <span>Você pagará</span>
                        <span>{getTotalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                )}
                <Button className="w-full h-auto" variant={soldOut ? 'outline' : 'default'} onClick={soldOut ? () => {} : handleBuy} disabled={soldOut}>
                    <span className="text-xl">{soldOut ? 'Esgotado' : 'Comprar'}</span>
                </Button>
                {soldOut && <span className="text-sm">Próximo ano tem mais!</span>}
            </div>
        </div>
    )
}
