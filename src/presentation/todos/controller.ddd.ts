import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


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
    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json({ "message": "Listado de todos", "data": todos });
    }

    /**
     * Metodo para crear un nuevo todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     */
    public getTodoById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        try {
            const todo = await this.todoRepository.getById(id);
            return res.json({ "message": "Todo encontrado", "data": todo });
        } catch (error) {
            return res.status(404).json({ "error": error });
        }
    }

    /**
     * Metodo para crear un nuevo todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     */
    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ "error": error });

        const todo = await this.todoRepository.create(createTodoDto!);
        return res.status(201).json({ "message": "Todo creado", "data": todo });
    }

    /**
     * Metodo para actualizar un todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     * */
    public updateTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id })
        if (error) return res.status(400).json({ "error": error });

        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
            return res.json({ "message": "Todo actualizado", "data": updatedTodo });
        } catch (error) {
            return res.status(404).json({ "error": error });
        }

    }

}