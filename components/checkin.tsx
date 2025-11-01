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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Ticket } from "@/types/ticket"
import { useRouter } from "next/navigation"
import { partyBeginsUTC } from "@/lib/utils"

export function Checkin({ ticket }: { ticket: Ticket }) {
  const [fantasy, setFantasy] = useState(false)
  const [description, setDescription] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    console.log("Participating in fantasy contest:", fantasy)
    if (fantasy) {
      console.log("Fantasy description:", description)
    }
    setIsOpen(false)

    const supabase = createClient()
    await supabase.from('tickets').update({ checkin_done: true }).eq('id', ticket.id)
    if (fantasy) {
      await supabase.from('fantasies').insert({ ticket_id: ticket.id, description })
    }

    router.refresh()
  }

  const handleCanCheckin = () => {
    const now = new Date()
    if (now >= partyBeginsUTC) {
      setIsOpen(true)
    } else {
      alert("O check-in só pode ser realizado a partir do início da festa.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="link" className="text-[#160D18] text-lg" onClick={handleCanCheckin}>Fazer check-in</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Realizar Check-in</DialogTitle>
          <DialogDescription>
            Confirme sua presença no evento e participe do concurso de fantasias!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="email-1">Participar do concurso de fantasias?</Label>
            <Checkbox checked={fantasy} onCheckedChange={(checked) => setFantasy(typeof checked === "boolean" ? checked : false)} />
          </div>
          <span className="italic text-sm">Prêmio: 2x ingressos grátis para a próxima edição + Caixa de bombom</span>
          {fantasy && (
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição da fantasia</Label>
              <Input id="description" name="description" placeholder="Descreva sua fantasia" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Fazer check-in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
