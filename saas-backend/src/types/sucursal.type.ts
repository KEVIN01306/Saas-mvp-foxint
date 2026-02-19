import { z } from "zod";
import { sucursalCrearSchema, sucursalActualizarSchema, sucursalSchema } from "../zod/sucursales.schema.js";

export type SucursalType = z.infer<typeof sucursalSchema>;
export type SucursalCrearType = z.infer<typeof sucursalCrearSchema>;
export type SucursalActualizarType = z.infer<typeof sucursalActualizarSchema>;