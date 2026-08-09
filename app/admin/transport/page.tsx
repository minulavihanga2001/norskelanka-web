import { redirect } from "next/navigation";
import {
  deleteDriverAction,
  deleteVehicleAction,
  saveDriverAction,
  saveVehicleAction,
} from "@/app/actions/admin";
import { Field } from "@/components/admin/Field";
import { isAdminAuthenticated } from "@/lib/auth";
import { listDrivers, listVehicles } from "@/lib/data/store";

export default async function AdminTransportPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const vehicles = listVehicles();
  const drivers = listDrivers();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-display text-3xl text-ink">Vehicles</h1>
        {vehicles.map((item) => (
          <div key={item.id} className="glass-strong rounded-2xl p-4">
            <div className="flex justify-between">
              <div className="font-medium">{item.name.en}</div>
              <form action={deleteVehicleAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
            <form action={saveVehicleAction} className="mt-3 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Name EN" name="nameEn" defaultValue={item.name.en} />
              <Field label="Name NO" name="nameNo" defaultValue={item.name.no} />
              <Field label="Summary EN" name="summaryEn" defaultValue={item.summary.en} textarea />
              <Field label="Summary NO" name="summaryNo" defaultValue={item.summary.no} textarea />
              <Field label="Image" name="image" defaultValue={item.image} />
              <Field label="Seats" name="seats" type="number" defaultValue={item.seats} />
              <Field label="Year" name="year" type="number" defaultValue={item.year} />
              <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white">
                Save
              </button>
            </form>
          </div>
        ))}
        <form action={saveVehicleAction} className="glass-strong grid gap-3 rounded-[1.3rem] p-5 md:grid-cols-2">
          <h2 className="font-display text-xl md:col-span-2">Add vehicle</h2>
          <Field label="Name EN" name="nameEn" required />
          <Field label="Name NO" name="nameNo" required />
          <Field label="Seats" name="seats" type="number" defaultValue={3} />
          <Field label="Year" name="year" type="number" defaultValue={2024} />
          <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
            Create vehicle
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl text-ink">Drivers</h2>
        {drivers.map((item) => (
          <div key={item.id} className="glass-strong rounded-2xl p-4">
            <div className="flex justify-between">
              <div className="font-medium">{item.name}</div>
              <form action={deleteDriverAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
            <form action={saveDriverAction} className="mt-3 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={item.id} />
              <Field label="Name" name="name" defaultValue={item.name} />
              <Field label="Image" name="image" defaultValue={item.image} />
              <Field label="Bio EN" name="bioEn" defaultValue={item.bio.en} textarea />
              <Field label="Bio NO" name="bioNo" defaultValue={item.bio.no} textarea />
              <Field
                label="Languages"
                name="languages"
                defaultValue={item.languages.join(", ")}
              />
              <Field
                label="Years experience"
                name="yearsExperience"
                type="number"
                defaultValue={item.yearsExperience}
              />
              <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white">
                Save
              </button>
            </form>
          </div>
        ))}
        <form action={saveDriverAction} className="glass-strong grid gap-3 rounded-[1.3rem] p-5 md:grid-cols-2">
          <h3 className="font-display text-xl md:col-span-2">Add driver</h3>
          <Field label="Name" name="name" required />
          <Field label="Years experience" name="yearsExperience" type="number" defaultValue={5} />
          <Field label="Bio EN" name="bioEn" textarea />
          <Field label="Bio NO" name="bioNo" textarea />
          <button type="submit" className="rounded-full bg-leaf px-4 py-2 text-sm text-white md:col-span-2">
            Create driver
          </button>
        </form>
      </section>
    </div>
  );
}
