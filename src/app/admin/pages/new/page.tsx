import { savePage } from "@/app/actions";
import { ContentForm } from "@/components/content-form";

export default function NewPagePage() {
  return (
    <div>
      <h1 className="text-4xl font-black text-white">New Page</h1>
      <div className="mt-8">
        <ContentForm type="page" action={savePage} />
      </div>
    </div>
  );
}
