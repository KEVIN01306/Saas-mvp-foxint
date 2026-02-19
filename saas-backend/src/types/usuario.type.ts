import { z } from 'zod'
import { usuarioActualizarSchema, usuariosCrearSchema, usuariosSchema } from '../zod/usuarios.schema.js'

export type UsuarioType = z.infer<typeof usuariosSchema>

export type UsuarioCrearType = z.infer<typeof usuariosCrearSchema>

export type UsuarioActualizarType = z.infer<typeof usuarioActualizarSchema>