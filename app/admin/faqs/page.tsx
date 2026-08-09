import { redirect } from "next/navigation";
import { deleteFaqAction, saveFaqAction } from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listFaqs } from "@/lib/data/store";

export default async function AdminFaqsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const items = listFaqs();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-ink">FAQ</h1>
      {items.map((item) => (
        <div key={item.id} className="glass-strong rounded-2xl p-4">
          <div className="flex justify-between">
            <div className="font-medium">{item.question.en}</div>
            <form action={deleteFaqAction}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-sm text-red-700">
                Delete
              </button>
            </form>
          </div>
          <form action={saveFaqAction} className="mt-3 grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <Field label="Question EN" name="questionEn" defaultValue={item.question.en} textarea />
            <Field label="Question NO" name="questionNo" defaultValue={item.question.no} textarea />
            <Field label="Answer EN" name="answerEn" defaultValue={item.answer.en} textarea rows={4} />
            <Field label="Answer NO" name="answerNo" defaultValue={item.answer.no} textarea rows={4} />
            <Field label="Order" name="order" type="number" defaultValue={item.order} />
            <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white">
              Save
            </button>
          </form>
        </div>
      ))}
      <form action={saveFaqAction} className="glass-strong grid gap-3 rounded-[1.3rem] p-5 md:grid-cols-2">
        <h2 className="font-display text-xl md:col-span-2">Add FAQ</h2>
        <Field label="Question EN" name="questionEn" textarea required />
        <Field label="Question NO" name="questionNo" textarea required />
        <Field label="Answer EN" name="answerEn" textarea rows={4} />
        <Field label="Answer NO" name="answerNo" textarea rows={4} />
        <Field label="Order" name="order" type="number" defaultValue={99} />
        <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
          Create
        </button>
      </form>
    </div>
  );
}
