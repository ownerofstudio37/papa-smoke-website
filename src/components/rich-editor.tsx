"use client";

import { useRef, useState } from "react";
import { Bold, Heading2, Italic, List, Pilcrow } from "lucide-react";

type RichEditorProps = {
  name: string;
  initialValue?: string;
  generatedValue?: string;
};

export function RichEditor({ name, initialValue = "", generatedValue }: RichEditorProps) {
  const [html, setHtml] = useState(generatedValue || initialValue);
  const [plainMode, setPlainMode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  function exec(command: string, value?: string) {
    document.execCommand(command, false, value);
    setHtml(editorRef.current?.innerHTML || "");
  }

  return (
    <div className="rounded border border-white/10 bg-black">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-3">
        <button type="button" aria-label="Bold" onClick={() => exec("bold")} className="grid size-9 place-items-center rounded bg-white/10 hover:bg-white/20">
          <Bold className="size-4" />
        </button>
        <button type="button" aria-label="Italic" onClick={() => exec("italic")} className="grid size-9 place-items-center rounded bg-white/10 hover:bg-white/20">
          <Italic className="size-4" />
        </button>
        <button type="button" aria-label="Heading" onClick={() => exec("formatBlock", "h2")} className="grid size-9 place-items-center rounded bg-white/10 hover:bg-white/20">
          <Heading2 className="size-4" />
        </button>
        <button type="button" aria-label="Paragraph" onClick={() => exec("formatBlock", "p")} className="grid size-9 place-items-center rounded bg-white/10 hover:bg-white/20">
          <Pilcrow className="size-4" />
        </button>
        <button type="button" aria-label="Bullet list" onClick={() => exec("insertUnorderedList")} className="grid size-9 place-items-center rounded bg-white/10 hover:bg-white/20">
          <List className="size-4" />
        </button>
        <label className="ml-auto flex items-center gap-2 text-sm font-bold text-stone-300">
          <input
            type="checkbox"
            checked={plainMode}
            onChange={(event) => setPlainMode(event.target.checked)}
          />
          Text only
        </label>
      </div>
      {plainMode ? (
        <textarea
          className="min-h-[26rem] w-full resize-y bg-black p-5 font-mono text-sm leading-7 text-stone-100 outline-none"
          value={html}
          onChange={(event) => setHtml(event.target.value)}
        />
      ) : (
        <div
          ref={editorRef}
          className="editor-surface content-html min-h-[26rem] p-5 outline-none"
          contentEditable
          data-placeholder="Write or generate content..."
          dangerouslySetInnerHTML={{ __html: html }}
          onInput={() => setHtml(editorRef.current?.innerHTML || "")}
          suppressContentEditableWarning
        />
      )}
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
