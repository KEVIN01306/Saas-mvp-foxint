import { z } from "zod";
import type { negociosSchema, negocioActualizarSchema, negocioCrearSchema } from "../zod/negocios.schema.js";

export type NegocioType = z.infer<typeof negociosSchema>;
export type NegocioCrearType = z.infer<typeof negocioCrearSchema>;
export type NegocioActualizarType = z.infer<typeof negocioActualizarSchema>;