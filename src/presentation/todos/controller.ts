import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { Request, Response } from "express";


export class TodosController {
    /**
     * Constructor de la clase.
     */
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    /**
     * Metodo para obtener todos los todos.
     * @param req Request.
     * @param res Response.
     * @returns Todos en JSON.
     */
    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json({ "message": "Listado de todos", "data": todos }))
            .catch(error => res.status(500).json({ "error": error }));
    }

    /**
     * Metodo para crear un nuevo todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     */
    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json({ "message": "Todo encontrado", "data": todo }))
            .catch(error => res.status(404).json({ "error": error }));
    }

    /**
     * Metodo para crear un nuevo todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     */
    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ "error": error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json({ "message": "Todo creado", "data": todo }))
            .catch(error => res.status(400).json({ "error": error }));
    }

    /**
     * Metodo para actualizar un todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     * */
    public updateTodo = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id })
        if (error) return res.status(400).json({ "error": error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json({ "message": "Todo actualizado", "data": todo }))
            .catch(error => res.status(400).json({ "error": error }));
    }
}