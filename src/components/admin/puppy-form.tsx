import { savePuppy } from "@/app/admin/(panel)/puppies/actions";
import { AdminForm } from "@/components/admin/admin-form";
import { Field, fieldClasses } from "@/components/admin/fields";
import { PhotoUpload } from "@/components/admin/photo-upload";
import type { PuppyRow } from "@/data/puppies";

export function PuppyForm({ puppy }: { puppy?: PuppyRow }) {
  return (
    <AdminForm action={savePuppy} submitLabel={puppy ? "Save changes" : "Add puppy"}>
      {puppy && <input type="hidden" name="id" value={puppy.id} />}

      <PhotoUpload name="image" defaultValue={puppy?.image} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required maxLength={60} defaultValue={puppy?.name} className={fieldClasses} />
        </Field>
        <Field label="Price (USD)">
          <input
            name="price"
            type="number"
            required
            min={0}
            max={1000000}
            step={1}
            defaultValue={puppy?.price}
            className={fieldClasses}
          />
        </Field>
        <Field label="Gender">
          <select name="gender" required defaultValue={puppy?.gender ?? "Male"} className={fieldClasses}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>
        <Field label="Date of birth" hint="The website shows the age in weeks and keeps it up to date by itself.">
          <input
            name="date_of_birth"
            type="date"
            required
            max={new Date().toISOString().slice(0, 10)}
            defaultValue={puppy?.date_of_birth}
            className={fieldClasses}
          />
        </Field>
        <Field label="Breed">
          <input name="breed" required maxLength={60} defaultValue={puppy?.breed ?? "Pitbull"} className={fieldClasses} />
        </Field>
        <Field label="Color">
          <input name="color" required maxLength={60} defaultValue={puppy?.color} placeholder="e.g. Blue & White" className={fieldClasses} />
        </Field>
      </div>

      <Field label="Status" hint="Sold puppies are hidden from the website.">
        <select name="status" required defaultValue={puppy?.status ?? "available"} className={fieldClasses}>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
      </Field>
    </AdminForm>
  );
}
