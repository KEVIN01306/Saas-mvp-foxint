import z from "zod";


export const loginSchema = z.object({
    telefono: z.string().max(20),
    password_hash: z.string()
});