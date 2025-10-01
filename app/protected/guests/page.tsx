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

  const tickets = await supabase.from('tickets').select('*').order('name', { ascending: true })
  const claimedTickets = tickets.data?.filter(ticket => ticket.name) || []

  return (
    <div className="max-w-xl w-full m-auto py-8 px-4 text-white grid gap-10">
      <div className="flex items-center gap-4">
        <Link href="/protected"><ArrowLeft /></Link>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Guests</h2>
          <p>{claimedTickets.length}/60 convidados</p>
        </div>
        <div className="grid gap-4">
          {claimedTickets.map((ticket) => (
            <Fragment key={ticket.id}>
              <div className="h-full">{ticket.name}</div>
              <Separator className="bg-[#663666]" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
