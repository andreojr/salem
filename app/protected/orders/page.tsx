import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { ConfirmPayment } from "@/components/confirm-payment";
import { adminEmails, getAmountOfTicketsSold, getCurrentBatch, getTicketPrice, getTotalEstimatedFunds } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!adminEmails.includes(data?.claims.email || '')) {
    redirect("/");
  }

  const amountOfticketsSold = await getAmountOfTicketsSold(supabase)
  const batch = getCurrentBatch(amountOfticketsSold)

  const orders = await supabase.from('orders').select('*')
  const cash = orders.data?.reduce((acc, order) => acc + (order.paid || 0), 0) || 0

  function toBRL(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div className="max-w-xl m-auto py-8 px-4 text-white grid gap-10">
      <div className="flex items-center gap-4">
        <Link href="/protected"><ArrowLeft /></Link>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div>
        <span className="text-lg text-green-500">{cash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        /{toBRL(getTotalEstimatedFunds())} arrecadados
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Orders</h2>
          <p>{orders.data?.length} pedido{orders.data?.length != 1 && 's'}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
          {orders.data?.map((order) => (
            <Fragment key={order.id}>
              <p className="h-full flex items-center">{order.paid ? toBRL(order.paid) : toBRL(order.amount * getTicketPrice(batch))}</p>
              <p className="h-full flex items-center font-medium w-full overflow-hidden">{order.buyerEmail}</p>
              <div className="h-full">
                {order.paid ? <span className="text-green-500">Pago</span> : <ConfirmPayment order={order} batch={batch} />}
              </div>
              <Separator className="col-span-3 bg-[#663666]" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
