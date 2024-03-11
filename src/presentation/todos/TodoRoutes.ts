import { Router } from "express";

import { TodoController } from "./TodoController";

/**
 * Clase TodoRoutes.
 * Clase para gestionar las rutas de la entidad "Todo".
 */
export class TodoRoutes {
    /**
     * Metodo para retornar las rutas de la
     * entidad "Todo".
     * @returns Rutas de la entidad "Todo".
    */
    static get routes(): Router {
        const router = Router();
        const todosController = new TodoController();

        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/create', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete("/:id", todosController.deleteTodo);

        return router;
    }
}