import { envs } from "./config/envs";

import { AppRoutes } from "./presentation/routes";
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
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });
    server.start();
}