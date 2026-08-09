import { redirect } from "next/navigation";
import { deleteReviewAction, saveReviewAction } from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listReviews } from "@/lib/data/store";

export default async function AdminReviewsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const items = listReviews();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-ink">Reviews</h1>
      {items.map((item) => (
        <div key={item.id} className="glass-strong rounded-2xl p-4">
          <div className="flex justify-between">
            <div className="font-medium">{item.name}</div>
            <form action={deleteReviewAction}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-sm text-red-700">
                Delete
              </button>
            </form>
          </div>
          <form action={saveReviewAction} className="mt-3 grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <Field label="Name" name="name" defaultValue={item.name} />
            <Field label="Country EN" name="countryEn" defaultValue={item.country.en} />
            <Field label="Country NO" name="countryNo" defaultValue={item.country.no} />
            <Field label="Date" name="date" type="date" defaultValue={item.date} />
            <Field label="Rating" name="rating" type="number" defaultValue={item.rating} />
            <Field label="Image" name="image" defaultValue={item.image} />
            <Field label="Video URL (optional)" name="videoUrl" defaultValue={item.videoUrl ?? ""} />
            <Field label="Text EN" name="textEn" defaultValue={item.text.en} textarea />
            <Field label="Text NO" name="textNo" defaultValue={item.text.no} textarea />
            <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
              Save
            </button>
          </form>
        </div>
      ))}
      <form action={saveReviewAction} className="glass-strong grid gap-3 rounded-[1.3rem] p-5 md:grid-cols-2">
        <h2 className="font-display text-xl md:col-span-2">Add review</h2>
        <Field label="Name" name="name" required />
        <Field label="Rating" name="rating" type="number" defaultValue={5} />
        <Field label="Text EN" name="textEn" textarea />
        <Field label="Text NO" name="textNo" textarea />
        <Field label="Image" name="image" />
        <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
          Create
        </button>
      </form>
    </div>
  );
}
