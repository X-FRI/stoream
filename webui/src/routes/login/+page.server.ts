import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema))
    }
}