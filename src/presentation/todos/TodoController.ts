import { Request, Response } from "express";

interface Todo {
    id: number;
    text: string;
    completedAt: Date | null;
}

const todos: Todo[] = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy meat', completedAt: new Date() }
]

/**
 * Clase TodosController.
 * Gestiona los controladores asociados a la entidad "Todos".
 */
export class TodoController {
    /**
     * Metodo para listar todos los "Todos"
     * @param req Request.
     * @param res Response.
     * @returns Lista de "TODOS".
     */
    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    /**
     * Metodo para obtener un "Todo" de 
     * acuerdo a su "id". El "id" se obtiene
     * como parametro de la url.
     * @param req Request.
     * @param res Response.
     * @returns "TODO".
    */
    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({
                error: 'ID argument is not a number'
            });
        }

        const todo = todos.find(todo => todo.id === id);

        todo ?
            res.json(todo) :
            res.status(404).json({
                error: `Todo with id ${id} not found`
            });

    }

    /**
     * Metodo para crear un nuevo "TODO".
     * @param req Request.
     * @param res Response.
     * @return "TODO" creado.
     */
    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text)
            return res.status(400).json({
                error: 'Text property is required'
            });

        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: null
        }

        res.json(newTodo);
    }

    /**
     * Metodo para actualizar un "TODO".
     * @param req Request.
     * @param res Response.
     * @returns "TODO" actualizado.
     */
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({
                error: 'ID argument is not a number'
            });
        }

        const todo = todos.find(todo => todo.id === id);

        if (!todo)
            return res.status(404).json({
                error: `Todo with id ${id} not found`
            });

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;

        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);

        res.json(todo);
    }

    /**
     * Metodo para eliminar un "Todo" de acuerdo
     * a su "id".
     * @param req Request.
     * @param res Response.
     * @returns "TODO" eliminado.
     */
    deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({
                error: 'ID argument is not a number'
            });
        }

        const todo = todos.find(todo => todo.id === id);

        if (!todo)
            return res.status(404).json({
                error: `Todo with id ${id} not found`
            });

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    }
}