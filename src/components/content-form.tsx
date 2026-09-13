"use client";

import { useState, useTransition } from "react";
import { WandSparkles } from "lucide-react";
import { RichEditor } from "@/components/rich-editor";
import { generateBlogDraft, generatePageDraft } from "@/app/actions";

type Draft = {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  content?: string | null;
};

type ContentFormProps = {
  type: "post" | "page";
  action: (formData: FormData) => void | Promise<void>;
  item?: Draft & { id?: string; status?: string; featured_image_url?: string | null };
};

export function ContentForm({ type, action, item }: ContentFormProps) {
  const [draft, setDraft] = useState<Draft>(item || {});
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const isPost = type === "post";

  function generateDraft() {
    if (!topic.trim()) {
      return;
    }

    startTransition(async () => {
      try {
        setError("");
        const nextDraft = isPost
          ? await generateBlogDraft(topic)
          : await generatePageDraft(topic);
        setDraft(nextDraft);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Unable to generate content.");
      }
    });
  }

  return (
    <div className="grid gap-6">
      <section className="rounded border border-teal-300/20 bg-teal-300/10 p-5">
        <label className="text-sm font-black uppercase tracking-[0.18em] text-teal-100">
          AI {isPost ? "Blog Writer" : "Page Builder"}
        </label>
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder={isPost ? "Best glass pipes in Pinehurst" : "Delta 8 info Pinehurst"}
            className="min-h-12 flex-1 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-teal-300"
          />
          <button
            type="button"
            onClick={generateDraft}
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-teal-300 px-5 font-black text-black disabled:opacity-60"
          >
            <WandSparkles className="size-4" />
            {isPending ? "Generating" : "Generate"}
          </button>
        </div>
        {error ? (
          <p className="mt-3 rounded border border-red-400/25 bg-red-500/10 p-3 text-sm font-bold text-red-100">
            {error}
          </p>
        ) : null}
      </section>

      <form action={action} className="grid gap-5">
        {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Title" name="title" value={draft.title} onChange={setDraft} required />
          <Field label="Slug" name="slug" value={draft.slug} onChange={setDraft} required />
        </div>
        {isPost ? (
          <>
            <Field label="Excerpt" name="excerpt" value={draft.excerpt} onChange={setDraft} />
            <Field
              label="Featured Image URL"
              name="featured_image_url"
              value={item?.featured_image_url || ""}
              onChange={setDraft}
            />
          </>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="SEO Title" name="meta_title" value={draft.meta_title} onChange={setDraft} />
          <Field
            label="Meta Description"
            name="meta_description"
            value={draft.meta_description}
            onChange={setDraft}
          />
        </div>
        <label className="grid gap-2 text-sm font-bold text-stone-300">
          Status
          <select
            name="status"
            defaultValue={item?.status || "draft"}
            className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <RichEditor
          key={draft.content || item?.content || "empty-editor"}
          name="content"
          initialValue={item?.content || ""}
          generatedValue={draft.content || ""}
        />
        <button className="min-h-12 rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300">
          Save {isPost ? "Post" : "Page"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value?: string | null;
  onChange: React.Dispatch<React.SetStateAction<Draft>>;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-stone-300">
      {label}
      <input
        name={name}
        value={value || ""}
        required={required}
        onChange={(event) =>
          onChange((current) => ({ ...current, [name]: event.target.value }))
        }
        className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
      />
    </label>
  );
}
