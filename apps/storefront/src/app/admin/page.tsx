import { notFound } from "next/navigation";
import { QuickAddPreview } from "@/components/QuickAddPreview";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Preview",
  robots: { index: false, follow: false }
};

export default function AdminPreviewPage() {
  if (process.env.ADMIN_PREVIEW_ENABLED !== "true") notFound();

  return (
    <div className="admin-preview-page">
      <div className="shell">
        <header className="admin-page-heading">
          <div className="eyebrow">Operator preview · persistence disabled</div>
          <h1>Add an item without learning the system underneath.</h1>
          <p>Photo, name, price, availability, category, preview. Advanced details stay out of the way until somebody actually needs them.</p>
        </header>
        <QuickAddPreview />
      </div>
    </div>
  );
}
