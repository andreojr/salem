'use client'
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Order } from "@/types/ticket";
import { getTicketPrice } from "@/lib/utils";

export function ConfirmPayment({ order, batch }: { order: Order, batch: number}) {
    const router = useRouter()

    async function handleConfirmPayment() {
        try {
            const supabase = createClient()
            await supabase.from('orders').update({ batch, paid: order.amount * getTicketPrice(batch) }).eq('id', order.id).limit(1)
            router.refresh()
        } catch {}
    }

    return (
        <Button onClick={handleConfirmPayment}>Confirmar pagamento</Button>
    )
}