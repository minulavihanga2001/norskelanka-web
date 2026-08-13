import { redirect } from "next/navigation";
import { deleteHotelAction, saveHotelAction } from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listHotels } from "@/lib/data/store";

export default async function AdminHotelsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const items = listHotels();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-ink">Hotels</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-strong rounded-2xl p-4">
            <div className="flex justify-between gap-3">
              <div className="font-medium">{item.name.en}</div>
              <form action={deleteHotelAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
            <form action={saveHotelAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Name EN" name="nameEn" defaultValue={item.name.en} required />
              <Field label="Name NO" name="nameNo" defaultValue={item.name.no} required />
              <Field label="Slug" name="slug" defaultValue={item.slug} />
              <Field label="Image" name="image" defaultValue={item.image} />
              <Field label="Location EN" name="locationEn" defaultValue={item.location.en} />
              <Field label="Location NO" name="locationNo" defaultValue={item.location.no} />
              <Field label="Summary EN" name="summaryEn" defaultValue={item.summary.en} textarea />
              <Field label="Summary NO" name="summaryNo" defaultValue={item.summary.no} textarea />
              <Field
                label="Discount %"
                name="discountPercent"
                type="number"
                defaultValue={item.discountPercent}
              />
              <Field label="Stars" name="stars" type="number" defaultValue={item.stars} />
              <Field
                label="Package IDs"
                name="packageIds"
                defaultValue={item.packageIds.join(",")}
              />
              <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
                Save
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="glass-strong rounded-[1.4rem] p-5">
        <h2 className="font-display text-xl">Add hotel</h2>
        <form action={saveHotelAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Name EN" name="nameEn" required />
          <Field label="Name NO" name="nameNo" required />
          <Field label="Discount %" name="discountPercent" type="number" defaultValue={10} />
          <Field label="Stars" name="stars" type="number" defaultValue={4} />
          <Field label="Image" name="image" />
          <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
