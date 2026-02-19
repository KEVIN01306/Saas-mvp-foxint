import type { ZodError } from "zod";

type CodigoError =
    | 'ERR_PLAN_LIMIT'
    | 'DATA_NOT_FOUND'
    | 'INTERNAL_ERROR'
    | 'AUTH_REQUIRED'
    | 'VALIDATION_ERROR'
    | 'INVALID_CREDENTIALS'
    | 'INVALID_TOKEN'
    | 'MISSING_DATA'
    | 'FORBIDDEN'
    | 'UNAUTHORIZED'
    | 'TOKEN_EXPIRED'
    | 'USER_NOT_FOUND'
    | 'AUTH_FAILED'
    | 'WA_ID_ALREADY_EXISTS';

type Status = "success" | "error";

class Respuesta<T = any> {
    public readonly status: Status;
    public readonly code?: CodigoError;
    public readonly message: string;
    public readonly data: T | null;
    public readonly count?: number;

    private constructor(status: Status, message: string, data: T | null, code?: CodigoError) {
        this.status = status;
        this.message = message;
        this.data = data;
        if (code) this.code = code;
        if (Array.isArray(data)) this.count = data.length;
    };

    static exito<T>(message: string, data: T): Respuesta<T> {
        return new Respuesta('success', message, data);
    };

    static error(message: string, code: CodigoError): Respuesta<null> {
        return new Respuesta('error', message, null, code);
    };

    static validacion(error: ZodError): Respuesta<any> {
        const mensajeLimpio = error.issues
            .map(err => `${err.path.join('.')}: ${err.message}`)
            .join(", ");

        return new Respuesta(
            'error',
            `Error de validación: ${mensajeLimpio}`,
            error.flatten().fieldErrors,
            'VALIDATION_ERROR'
        );
    }
};

export default Respuesta;