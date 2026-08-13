import { redirect } from "next/navigation";
import {
  deleteDestinationAction,
  saveDestinationAction,
} from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listDestinations } from "@/lib/data/store";

export default async function AdminDestinationsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const items = listDestinations();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-ink">Destinations</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-strong rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-medium">{item.name.en}</div>
                <div className="text-xs text-ink-muted">/{item.slug}</div>
              </div>
              <form action={deleteDestinationAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
            <form action={saveDestinationAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Name EN" name="nameEn" defaultValue={item.name.en} required />
              <Field label="Name NO" name="nameNo" defaultValue={item.name.no} required />
              <Field label="Slug" name="slug" defaultValue={item.slug} />
              <Field label="Image URL" name="image" defaultValue={item.image} />
              <Field label="Summary EN" name="summaryEn" defaultValue={item.summary.en} textarea />
              <Field label="Summary NO" name="summaryNo" defaultValue={item.summary.no} textarea />
              <Field label="Description EN" name="descriptionEn" defaultValue={item.description.en} textarea />
              <Field label="Description NO" name="descriptionNo" defaultValue={item.description.no} textarea />
              <Field label="Latitude" name="lat" type="number" defaultValue={item.lat} />
              <Field label="Longitude" name="lng" type="number" defaultValue={item.lng} />
              <Field
                label="Related package IDs (comma)"
                name="relatedPackageIds"
                defaultValue={item.relatedPackageIds.join(",")}
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="trending" defaultChecked={item.trending} />
                Trending
              </label>
              <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
                Save
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="glass-strong rounded-[1.4rem] p-5">
        <h2 className="font-display text-xl">Add destination</h2>
        <form action={saveDestinationAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Name EN" name="nameEn" required />
          <Field label="Name NO" name="nameNo" required />
          <Field label="Slug" name="slug" />
          <Field label="Image URL" name="image" />
          <Field label="Summary EN" name="summaryEn" textarea />
          <Field label="Summary NO" name="summaryNo" textarea />
          <Field label="Description EN" name="descriptionEn" textarea />
          <Field label="Description NO" name="descriptionNo" textarea />
          <Field label="Latitude" name="lat" type="number" defaultValue={7.87} />
          <Field label="Longitude" name="lng" type="number" defaultValue={80.77} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="trending" />
            Trending
          </label>
          <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
