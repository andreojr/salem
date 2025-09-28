import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { adminEmails } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!adminEmails.includes(data?.claims.email || '')) {
    redirect("/");
  }

  const tickets = await supabase.from('tickets').select('*, order:orders(*)')
  const sortedTickets = tickets.data?.sort((a, b) => {
    return a.order.batch - b.order.batch
  })
  const filteredTickets = sortedTickets?.filter(ticket => ticket.order && ticket.order.paid !== null && ticket.order.batch !== null) || []

  return (
    <div className="max-w-xl m-auto py-8 px-4 text-white grid gap-10">
      <div className="flex items-center gap-4">
        <Link href="/protected"><ArrowLeft /></Link>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Tickets</h2>
          <p>{filteredTickets.length} ingresso{filteredTickets.length != 1 && 's'}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_3fr] gap-4">
          <p>Lote</p>
          <p>Nome</p>
          <p>E-mail</p>
          {filteredTickets.map((ticket) => (
            <Fragment key={ticket.id}>
              <p className="h-full flex items-center">{ticket.order.batch}</p>
              {ticket.name !== null && <div className="h-full">{ticket.name}</div>}
              {ticket.name === null && <div className="h-full"><span className="text-yellow-400">Pendente</span></div>}
              <p className="h-full flex items-center font-medium w-full overflow-hidden">{ticket.email}</p>
              <Separator className="col-span-3 bg-[#663666]" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
