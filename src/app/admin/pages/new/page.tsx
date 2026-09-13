import { savePage } from "@/app/actions";
import { ContentForm } from "@/components/content-form";

export default async function NewPagePage({
  searchParams,
}: PageProps<"/admin/pages/new">) {
  const params = await searchParams;
  const saveError = typeof params.error === "string" ? params.error : null;

  return (
    <div>
      <h1 className="text-4xl font-black text-white">New Page</h1>
      <div className="mt-8">
        <ContentForm type="page" action={savePage} saveError={saveError} />
      </div>
    </div>
  );
}
