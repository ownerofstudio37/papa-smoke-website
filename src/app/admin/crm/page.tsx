import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { type Lead } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const statusStyles: Record<Lead["status"], string> = {
  new: "border-teal-300/30 bg-teal-300/10 text-teal-100",
  contacted: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  qualified: "border-sky-300/30 bg-sky-300/10 text-sky-100",
  won: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  lost: "border-stone-300/30 bg-stone-300/10 text-stone-100",
  spam: "border-red-300/30 bg-red-300/10 text-red-100",
};

export default async function CrmPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase.from("leads").select("*").order("created_at", { ascending: false })
    : { data: [] };
  const leads = (data || []) as Lead[];

  return (
    <div>
      <div>
        <h1 className="text-4xl font-black text-white">CRM</h1>
        <p className="mt-2 text-stone-400">
          Track website leads, owner-demo inquiries, and follow-up notes.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {(["new", "contacted", "qualified", "won"] as Lead["status"][]).map((status) => (
          <div key={status} className="rounded border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-bold capitalize text-stone-400">{status}</p>
            <p className="mt-2 text-3xl font-black text-white">
              {leads.filter((lead) => lead.status === status).length}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded border border-white/10">
        {leads.map((lead) => (
          <Link
            key={lead.id}
            href={`/admin/crm/${lead.id}`}
            className="grid gap-4 border-b border-white/10 bg-black p-5 hover:bg-white/[0.04] md:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-black text-white">{lead.name}</h2>
                <span className={`rounded border px-2 py-1 text-xs font-black capitalize ${statusStyles[lead.status]}`}>
                  {lead.status}
                </span>
                <span className="rounded border border-white/10 px-2 py-1 text-xs font-bold capitalize text-stone-300">
                  {lead.priority} priority
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-amber-100">{lead.subject}</p>
              <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-stone-400">
                {lead.message}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-300">
                {lead.email ? (
                  <span className="inline-flex items-center gap-2">
                    <Mail className="size-4 text-teal-200" />
                    {lead.email}
                  </span>
                ) : null}
                {lead.phone ? (
                  <span className="inline-flex items-center gap-2">
                    <Phone className="size-4 text-teal-200" />
                    {lead.phone}
                  </span>
                ) : null}
              </div>
            </div>
            <p className="text-sm text-stone-500">
              {new Date(lead.created_at).toLocaleDateString("en-US")}
            </p>
          </Link>
        ))}
        {!leads.length ? <p className="bg-black p-5 text-stone-400">No leads yet.</p> : null}
      </div>
    </div>
  );
}
