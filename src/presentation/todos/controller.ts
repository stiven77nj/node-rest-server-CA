import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodosController {
    /**
     * Constructor de la clase.
     */
    constructor() { }

    /**
     * Metodo para obtener todos los todos.
     * @param req Request.
     * @param res Response.
     * @returns Todos en JSON.
     */
    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany({
            select: {
                Id: true,
                Text: true,
                CompletedAt: true
            }
        });

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

        if (isNaN(id)) return res.status(400).json({ "error": "Valor del parametro incorrecto" })

        const todo = await prisma.todo.findUnique({
            where: {
                Id: id
            }
        });

        todo ?
            res.json({ "message": "Todo encontrado", "data": todo }) :
            res.status(404).json({ "error": `Todo con id ${id} encontrado` });
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


        const todo = await prisma.todo.create({
            data: {
                Text: createTodoDto?.text!
            }
        });

        return res.json({ "message": "Todo creado de manera existosa", "data": todo });
    }

    /**
     * Metodo para actualizar un todo.
     * @param req Request.
     * @param res Response.
     * @returns Todo en JSON.
     * */
    public updateTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const [error, updateTodo] = UpdateTodoDto.update({ ...req.body, id })

        if (error) return res.status(400).json({ "error": error });

        const todo = await prisma.todo.findFirst({
            where: {
                Id: id
            }
        });

        if (!todo) return res.status(400).json({ "error": "Todo no encontrado" });

        const updatedTodo = await prisma.todo.update({
            where: {
                Id: id
            },
            data: updateTodo!.values
        });

        res.json({ "message": "Todo actualizado", "data": updatedTodo });
    }

}