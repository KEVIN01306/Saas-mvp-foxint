import type { Request, Response, NextFunction } from "express";
import UsuarioServices from "../services/usuarios.service.js";
import Respuesta from "../helpers/Respuesta.js";
import { usuarioActualizarSchema, usuariosCrearSchema } from "../zod/usuarios.schema.js";
import { ZodError } from "zod";
import prisma from "../configs/db.config.js";
import BaseController from "./base.controller.js";


class UsuarioController extends BaseController {

    constructor(private readonly usuarioService: UsuarioServices) {
        super()
    };

    public obtenerUsuarios = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { limit, offset } = res.locals.query
            const { negocio_id } = res.locals.usuario
            const usuarios = await this.usuarioService.obtenerUsuarios(limit, offset, negocio_id);
            res.status(200).json(Respuesta.paginacion("Usuarios Obtenidos con exito", usuarios.data, usuarios.total, usuarios.limit, usuarios.offset));
        } catch (error) {
            next(error);
        };
    };

    public obtenerUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            const usuario = await this.usuarioService.obtenerUsuario(String(id), negocio_id);
            res.status(200).json(Respuesta.exito("Usuario obtenido con exito", usuario));
        } catch (error) {
            next(error);
        };
    };

    public crearUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const usuarioCreado = await this.usuarioService.crearUsuario(data, negocio_id);

            res.status(201).json(Respuesta.exito("Usuario Creado con exito", usuarioCreado));

        } catch (error) {
            next(error);
        };
    };

    public actualizarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const data = req.body
            const { negocio_id } = this.obtenerEntorno(res)
            const usuarioActualizado = await this.usuarioService.actualizarUsuario(String(id), data, negocio_id)

            res.status(200).json(Respuesta.exito("Usuario Actualizado con exito", usuarioActualizado))
        } catch (error) {
            next(error)
        }
    }

    public eliminarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const { negocio_id } = this.obtenerEntorno(res)
            await this.usuarioService.eliminarUsuario(String(id), negocio_id)
            res.status(204).json(Respuesta.exito("Usuario eliminado con exito", null))
        } catch (error) {
            next(error)
        }
    }
};

const usuarioService = new UsuarioServices(prisma);
export default new UsuarioController(usuarioService);