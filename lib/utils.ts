import { SupabaseClient } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const adminEmails = ['keeponlyandrew@gmail.com', 'kellguiar@gmail.com', 'evelynefrodo@gmail.com', 'jtg.teixeira.83@gmail.com', 'higorleonardoll@gmail.com'];


const amountOfTicketsPerBatch = [25, 10, 25] // Total 60;
const ticketBasePrice = Number(process.env.NEXT_PUBLIC_TICKET_BASE_PRICE)

const preSaleEndDate = new Date('2025-10-01T03:00:00Z')

export function getTotalEstimatedFunds() {
  let total = 0;
  amountOfTicketsPerBatch.forEach((amount, i) => {
    total += getTicketPrice(i) * amount
  });
  return total
}

export async function getAmountOfTicketsSold(supabase: SupabaseClient) {
  const paidOrders = await supabase
    .from('orders')
    .select('*')
    .not('paid', 'is', null)
    .not('batch', 'is', null)
  if (paidOrders.error || !paidOrders.data)
    return 0
  return paidOrders.data.reduce((acc, order) => acc + order.amount, 0)
}

export function getTicketPrice(batch: number) {
  const now = new Date()
  const decreaser = now < preSaleEndDate ? 0 : 1
  return Number((ticketBasePrice + (batch - decreaser) * 5).toFixed(2))
}

export function getCurrentBatch(amountOfTicketsSold: number) {
  let checkpoint = 0
  const now = new Date()

  for (let i = 0; i < amountOfTicketsPerBatch.length; i++) {
    checkpoint += amountOfTicketsPerBatch[i];
    if (amountOfTicketsSold < checkpoint)
      return now < preSaleEndDate ? i : i + 1;
  }
  return -1;
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;
