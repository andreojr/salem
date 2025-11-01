import { Button } from "./ui/button";

export function Fantasy() {
  return (
    <div className="grid gap-4">
      <p className="text-2xl">Ingresso disponível</p>
      <div>
          <div className="ticket-shape flex py-4 px-8 text-[#160D18] justify-between !rounded-b-none">
              <div className="text-left">
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