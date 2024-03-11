import { Router } from "express";

import { TodoRoutes } from "./todos/TodoRoutes";

/**
 * Clase AppRoutes.
 * Clase para gestionar las rutas.
 */
export class AppRoutes {
    /**
     * Metodo para gestionar las rutas de la 
     * aplicacion.
     * @returns Rutas de la aplicacion.
    */
    static get routes(): Router {
        const router = Router();
        
        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}