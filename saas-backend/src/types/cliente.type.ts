import { z } from "zod";
import type { clienteActualizarSchema, clienteCrearSchema, clientesSchema } from "../zod/clientes.schema.js";

export type ClienteType = z.infer<typeof clientesSchema>;
export type ClienteCrearType = z.infer<typeof clienteCrearSchema>;
export type ClienteActualizarType = z.infer<typeof clienteActualizarSchema>;