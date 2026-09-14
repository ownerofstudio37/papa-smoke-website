import { notFound } from "next/navigation";
import { updateLead } from "@/app/actions";
import { type Lead, type LeadEvent } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function LeadDetailPage({
  params,
  searchParams,
}: PageProps<"/admin/crm/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  const error = typeof query.error === "string" ? query.error : null;
  const saved = query.saved === "1";
  const supabase = await createSupabaseServerClient();
  const { data: lead } = supabase
    ? await supabase.from("leads").select("*").eq("id", id).single()
    : { data: null };

  if (!lead) {
    notFound();
  }

  const { data: events } = supabase
    ? await supabase
        .from("lead_events")
        .select("*")
        .eq("lead_id", id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const currentLead = lead as Lead;
  const timeline = (events || []) as LeadEvent[];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <section>
        <h1 className="text-4xl font-black text-white">{currentLead.name}</h1>
        <p className="mt-2 text-stone-400">
          Created {new Date(currentLead.created_at).toLocaleString("en-US")}
        </p>

        <div className="mt-6 rounded border border-white/10 bg-black p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">
            Contact
          </p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="font-bold text-stone-500">Email</dt>
              <dd className="text-stone-100">{currentLead.email || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-bold text-stone-500">Phone</dt>
              <dd className="text-stone-100">{currentLead.phone || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-bold text-stone-500">Source</dt>
              <dd className="text-stone-100">{currentLead.source}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rounded border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-2xl font-black text-white">Lead Details</h2>
        {error ? (
          <p className="mt-4 rounded border border-red-400/25 bg-red-500/10 p-3 text-sm font-bold text-red-100">
            {error}
          </p>
        ) : null}
        {saved ? (
          <p className="mt-4 rounded border border-teal-300/25 bg-teal-300/10 p-3 text-sm font-bold text-teal-100">
            Lead saved.
          </p>
        ) : null}
        <form action={updateLead} className="mt-5 grid gap-5">
          <input type="hidden" name="id" value={currentLead.id} />
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-stone-300">
              Status
              <select
                name="status"
                defaultValue={currentLead.status}
                className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="spam">Spam</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-stone-300">
              Priority
              <select
                name="priority"
                defaultValue={currentLead.priority}
                className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-bold text-stone-300">
            Last Contacted
            <input
              type="datetime-local"
              name="last_contacted_at"
              defaultValue={currentLead.last_contacted_at?.slice(0, 16) || ""}
              className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-300">
            Admin Notes
            <textarea
              name="admin_notes"
              defaultValue={currentLead.admin_notes || ""}
              className="min-h-32 rounded border border-white/10 bg-black p-4 text-white outline-none focus:border-amber-300"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-300">
            Add Timeline Note
            <textarea
              name="event_body"
              placeholder="Called owner, sent proposal, needs Shopify URL..."
              className="min-h-24 rounded border border-white/10 bg-black p-4 text-white outline-none focus:border-amber-300"
            />
          </label>
          <button className="min-h-12 rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300">
            Save Lead
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-black text-white">Timeline</h3>
          <div className="mt-4 grid gap-3">
            {timeline.map((event) => (
              <article key={event.id} className="rounded border border-white/10 bg-black p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-200">
                  {event.event_type.replace("_", " ")}
                </p>
                <p className="mt-2 text-stone-200">{event.body || "No details"}</p>
                <p className="mt-2 text-xs text-stone-500">
                  {new Date(event.created_at).toLocaleString("en-US")}
                </p>
              </article>
            ))}
            {!timeline.length ? <p className="text-stone-400">No timeline events yet.</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
