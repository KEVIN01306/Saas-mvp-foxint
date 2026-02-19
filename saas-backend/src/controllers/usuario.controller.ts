import type { Request, Response, NextFunction } from "express";
import UsuarioServices from "../services/usuarios.service.js";
import Respuesta from "../helpers/Respuesta.js";
import { usuarioActualizarSchema, usuariosCrearSchema } from "../zod/usuarios.schema.js";
import { ZodError } from "zod";


class UsuarioController {

    private readonly usuarioService: UsuarioServices;

    constructor(usuarioService: UsuarioServices) {
        this.usuarioService = usuarioService;
    };

    public obtenerUsuarios = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const usuarios = await this.usuarioService.obtenerUsuarios();
            res.status(200).json(Respuesta.exito("Usuarios Obtenidos con exito", usuarios));
        } catch (error) {
            next(error);
        };
    };

    public obtenerUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const usuario = await this.usuarioService.obtenerUsuario(String(id));
            res.status(200).json(Respuesta.exito("Usuario obtenido con exito", usuario));
        } catch (error) {
            next(error);
        };
    };

    public crearUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body

            const usuarioCreado = await this.usuarioService.crearUsuario(data);

            res.status(201).json(Respuesta.exito("Usuario Creado con exito", usuarioCreado));

        } catch (error) {
            next(error);
        };
    };

    public actualizarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const data = req.body
            const usuarioActualizado = await this.usuarioService.actualizarUsuario(String(id), data)

            res.status(200).json(Respuesta.exito("Usuario Actualizado con exito", usuarioActualizado))
        } catch (error) {
            next(error)
        }
    }

    public eliminarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            await this.usuarioService.eliminarUsuario(String(id))
            res.status(204).json(Respuesta.exito("Usuario eliminado con exito", null))
        } catch (error) {
            next(error)
        }
    }
};

const usuarioService = new UsuarioServices();
export default new UsuarioController(usuarioService);