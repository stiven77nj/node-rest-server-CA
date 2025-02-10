import 'dotenv/config';
import { get } from 'env-var';

/**
 * Configuracion y validacion de las variables de entorno.
 */
export const envs = {
    // Puerto donde se ejecuta o escucha el servidor.
    PORT: get('PORT').required().asPortNumber(),
    // Path de la carpeta publica que expone el servidor.
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}