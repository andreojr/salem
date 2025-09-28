import { Address } from "@/components/address";
import { LogoutButton } from "@/components/logout-button";
import { Playlist } from "@/components/playlist";
import { Ticket } from "@/components/ticket";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { adminEmails } from "@/lib/utils";
import { ArrowUpRight, Calendar, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims
  const isTicketSaleOpen = Number(process.env.NEXT_PUBLIC_IS_TICKET_SALE_OPEN)

  return (
    <main className="max-w-xl m-auto py-8 px-4 text-white grid gap-10">
      {adminEmails.includes(claims?.email) && <Link href="/protected"><Button className="w-full">Admin Panel</Button></Link>}
      {/* Apresentação */}
      <section className="grid gap-10">
        <div className=" bg-red-500 rounded-3xl h-[20rem] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("./salem.png")' }} />
        <div className="text-center grid gap-2 m-auto">
          <p className="font-bold text-xl">O coven de Salém convoca você.</p>
          <p className="text-base">Venha brindar com porções mágicas, remexer o esqueleto e celebrar a noite das bruxas.</p>
          <p><a href="https://instagram.com/salemthecoven" target="_blank"><Button variant="link">Para mais informações, siga-nos no instagram<ArrowUpRight className="-ml-1" /></Button></a></p>
        </div>
      </section>

      {/* Quando e onde? */}
      <section className="">
        <div className="bg-[#3C243A] p-4 rounded-3xl grid gap-4">
          <div className="flex gap-4 text-[#3C243A]">
            <div className="bg-[#C4B9B7] rounded-2xl p-4 flex-1 flex gap-2 items-center justify-center">
              <Calendar />
              <p>1 nov</p>
            </div>
            <div className="bg-[#C4B9B7] rounded-2xl p-4 flex-1 flex gap-2 items-center justify-center">
              <Clock /> 
              <p>20:00</p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <Address />
          </div>
        </div>
      </section>

      {/* Playlist */}
      <section className="grid gap-10">
        <div className="text-center grid gap-2 m-auto">
          <p className="font-bold text-xl">Que tal dar uma de DJ?</p>
          <p className="text-base">Escolha o que será tocado na festa editando nossa playlist do Spotify!</p>
        </div>
        <div className="bg-[#3C243A] p-4 rounded-3xl flex flex-col gap-4">
          <Playlist />
        </div>
      </section>

      {/* Compra de ingresso */}
      <section className="grid gap-10">
        <div className="text-center grid gap-2 m-auto">
          <p className="font-bold text-xl">Como adquirir seu ingresso?</p>
          {
            !isTicketSaleOpen ? (
              <>
                <p>Em breve! As vendas começam em <strong>01/10</strong>.</p>
              </>
            ) : (
              <>
                <p>
                  Faça o login com sua conta Google, escolha a quantidade de ingressos, informe o email de cada convidado e confirme sua compra.
                </p>
                <p className="text-[#C4B9B7] mt-4 text-sm">
                  Você irá receber o código PIX para efetuar o pagamento no seu banco favorito. Assim que confirmado, seu lugar estará garantido!
                </p>
              </>
            )
          }
        </div>
        <div className="bg-[#3C243A] p-4 rounded-3xl flex flex-col gap-4 text-center">
          {
            !isTicketSaleOpen ? (
              <>
                <p className="text-sm">Adicione um lembrete e pague mais barato comprando na pré-venda.</p>
                <a target="_blank" className="bg-[#C4B9B7] rounded-2xl p-2 text-[#3C243A] text-center grid gap-2" href="lembrete.ics">
                  {/* Anúncio pré-venda 27/09 */}
                  <p>Adicionar Lembrete</p>
                </a>
              </>
            ) :
            <div>
              <Ticket />
              {claims && <LogoutButton />}
            </div>
          }
        </div>
      </section>

      {/* Avisos importantes */}
      <section className="text-center grid gap-8 m-auto">
        <p className="font-bold text-xl">Avisos Importantes</p>
        <div>
          <p>🍺</p>
          <p>Teremos bebidas alcoólicas</p>
        </div>
        <div>
          <p>🪄</p>
          <p>Fantasias são super bem-vindas — quanto mais criativo, melhor! Mas se preferir, venha do seu jeito.</p>
        </div>
      </section>
      <div className="w-4/5 m-auto h-[0.08rem] bg-[#C4B9B7] rounded-full" />
      <p className="m-auto">Feito com 💜 por <a download target="_blank" href="https://www.instagram.com/salemthecoven/" className="font-bold relative">Salem Co. <ExternalLink className="absolute -right-2 top-1" size={8} /></a></p>
    </main>
  );
}
