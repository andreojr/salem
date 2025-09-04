import { Address } from "@/components/address";
import { Playlist } from "@/components/playlist";
import { Calendar, Clock, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-xl m-auto py-10 text-white grid gap-10">
      {/* Apresentação */}
      <section className="grid gap-10">
        <div className="rounded-3xl h-[20.2rem] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url("./salem.png")' }} />
        <div className="text-center grid gap-2 w-4/5 m-auto">
          <p className="font-bold text-xl">O coven de Salém convoca você.</p>
          <p className="text-base">Venha brindar com porções mágicas, remexer o esqueleto e celebrar a noite das bruxas.</p>
        </div>
      </section>

      {/* Quando e onde? */}
      <section className="">
        <div className="bg-[#3C243A] p-4 rounded-3xl grid gap-4">
          <div className="flex gap-4 text-[#3C243A]">
            <div className="bg-[#C4B9B7] rounded-3xl p-4 flex-1 grid gap-2 items-center justify-center">
              <Calendar />
              <p>1 nov</p>
            </div>
            <div className="bg-[#C4B9B7] rounded-3xl p-4 flex-1 grid gap-2 items-center justify-center">
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
        <div className="text-center grid gap-2 w-4/5 m-auto">
          <p className="font-bold text-xl">Que tal dar uma de DJ?</p>
          <p className="text-base">Escolha o que será tocado na festa editando nossa playlist do Spotify!</p>
        </div>
        <div className="bg-[#3C243A] p-4 rounded-3xl flex flex-col gap-4">
          <Playlist />
        </div>
      </section>

      {/* Compra de ingresso */}
      <section className="grid gap-10">
        <div className="text-center grid gap-2 w-4/5 m-auto">
          <p className="font-bold text-xl">Como adquirir seu ingresso?</p>
          <p>Em breve! As vendas começam em <strong>01/10</strong>.</p>
        </div>
        <div className="bg-[#3C243A] p-4 rounded-3xl flex flex-col gap-4 text-center">
          <p className="text-sm">Adicione um lembrete e pague mais barato comprando na pré-venda.</p>
          <a target="_blank" className="bg-[#C4B9B7] rounded-2xl p-2 text-[#3C243A] text-center grid gap-2" href="https://calendar.google.com/calendar/u/0/r/eventedit?text=Pr%C3%A9+Venda+-+Sal%C3%A9m+Coven&dates=20250927T100000/20250927T110000&utm_source=chatgpt.com&pli=1">
            {/* Anúncio pré-venda 27/09 */}
            <p>Adicionar Lembrete</p>
          </a>
        </div>
      </section>

      {/* Avisos importantes */}
      <section className="text-center grid gap-8 w-4/5 m-auto">
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
      <div className="w-3/5 m-auto h-[0.08rem] bg-[#C4B9B7] rounded-full" />
      <p className="m-auto">Feito com 💜 por <a target="_blank" href="https://www.instagram.com/salemthecoven/" className="font-bold relative">Salem Co. <ExternalLink className="absolute -right-2 top-1" size={8} /></a></p>
    </main>
  );
}
