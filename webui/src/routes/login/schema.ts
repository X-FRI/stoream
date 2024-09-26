import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(12)
});

export type FormSchema = typeof formSchema;