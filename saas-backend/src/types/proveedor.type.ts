import { z } from 'zod';
import type { proveedorActualizarSchema, proveedorCrearSchema, proveedoresSchema } from '../zod/proveedores.schema.js';

export type ProveedorType = z.infer<typeof proveedoresSchema>
export type ProveedorCrearType = z.infer<typeof proveedorCrearSchema>
export type ProveedorActualizarType = z.infer<typeof proveedorActualizarSchema>