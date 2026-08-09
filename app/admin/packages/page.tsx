import { redirect } from "next/navigation";
import { deletePackageAction, savePackageAction } from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listPackages } from "@/lib/data/store";

export default async function AdminPackagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const items = listPackages();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-ink">Packages</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-strong rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{item.title.en}</div>
                <div className="text-xs text-ink-muted">
                  {item.durationDays} days · NOK {item.priceNok}
                </div>
              </div>
              <form action={deletePackageAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
            <form action={savePackageAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Title EN" name="titleEn" defaultValue={item.title.en} required />
              <Field label="Title NO" name="titleNo" defaultValue={item.title.no} required />
              <Field label="Slug" name="slug" defaultValue={item.slug} />
              <Field label="Image" name="image" defaultValue={item.image} />
              <Field label="Days" name="durationDays" type="number" defaultValue={item.durationDays} />
              <Field label="Price NOK" name="priceNok" type="number" defaultValue={item.priceNok} />
              <Field label="Summary EN" name="summaryEn" defaultValue={item.summary.en} textarea />
              <Field label="Summary NO" name="summaryNo" defaultValue={item.summary.no} textarea />
              <Field label="Description EN" name="descriptionEn" defaultValue={item.description.en} textarea />
              <Field label="Description NO" name="descriptionNo" defaultValue={item.description.no} textarea />
              <Field label="Hotel IDs" name="hotelIds" defaultValue={item.hotelIds.join(",")} />
              <Field
                label="Destination IDs"
                name="destinationIds"
                defaultValue={item.destinationIds.join(",")}
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={item.featured} />
                Featured
              </label>
              <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
                Save
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="glass-strong rounded-[1.4rem] p-5">
        <h2 className="font-display text-xl">Add package</h2>
        <form action={savePackageAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Title EN" name="titleEn" required />
          <Field label="Title NO" name="titleNo" required />
          <Field label="Days" name="durationDays" type="number" defaultValue={7} />
          <Field label="Price NOK" name="priceNok" type="number" defaultValue={15000} />
          <Field label="Image" name="image" />
          <Field label="Summary EN" name="summaryEn" textarea />
          <Field label="Summary NO" name="summaryNo" textarea />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" />
            Featured
          </label>
          <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
