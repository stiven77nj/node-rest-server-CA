import { envs } from "./config/envs";
import { Server } from "./presentation/server";

/**
 * Funcion autoinvocada.
*/
(async () => {
    main();
})();

/**
 * Funcion principal.
 * Se inicializa el servidor.
 */
function main() {
    const server = new Server({
        port: 3000,
        publicPath: envs.PUBLIC_PATH
    });
    server.start();
}