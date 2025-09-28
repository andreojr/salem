import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { adminEmails } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!adminEmails.includes(data?.claims.email || '')) {
    redirect("/");
  }

  return (
    <div className="max-w-xl m-auto py-8 px-4 text-white grid gap-10">
      <div className="flex items-center gap-4">
        <Link href="/"><ArrowLeft /></Link>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Link href="/protected/orders"><Button>Pedidos</Button></Link>
        <Link href="/protected/tickets"><Button>Ingressos</Button></Link>
        <Link href="/protected/guests"><Button>Lista de Convidados</Button></Link>
      </div>
    </div>
  );
}
