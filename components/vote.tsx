'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Ticket } from "@/types/ticket"
import { Fantasy } from "@/types/fantasy"
import { useRouter } from "next/navigation"

export function Vote({ ticket, fantasies }: { ticket: Ticket, fantasies: Fantasy[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log("Fantasies available for voting:", fantasies)
  })

  const handleVote = async (fantasyId: string) => {
    const supabase = createClient()
    await supabase.from('tickets').update({ voted_fantasy_id: fantasyId }).eq('id', ticket.id)
    router.refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-[#160D18] text-lg">Votar agora</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Realize seu voto</DialogTitle>
          <DialogDescription>
            Vote na fantasia que você acha que merece ganhar o concurso!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {fantasies.map((f) => (
            <div key={f.id} className="p-4 border rounded-lg grid grid-cols-[4fr_minmax(0,2fr)] gap-2">
              <div className="grid">
                <span className="font-bold">{f.description}</span>
                <span className="font-medium">{f.fantasies_ticket_id_fkey.name}</span>
              </div>
              {ticket.voted_fantasy_id === f.id ? (
                <Button className="mt-2" disabled>Selecionado</Button>
              ) : (
                <Button className="mt-2" onClick={() => handleVote(f.id)}>Votar</Button>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Pronto</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
