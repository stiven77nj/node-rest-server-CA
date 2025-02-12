import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: {
                Text: createTodoDto.text
            }
        });

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany({
            select: {
                Id: true,
                Text: true,
                CompletedAt: true
            }
        });

        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async getById(id: number): Promise<TodoEntity | undefined> {
        const todo = await prisma.todo.findUnique({
            where: {
                Id: id
            }
        })

        if (!todo) throw `Todo con id ${id} no encontrado`;

        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.getById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: {
                Id: updateTodoDto.id
            },
            data: updateTodoDto.values
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.getById(id);

        const deletedTodo = await prisma.todo.delete({
            where: {
                Id: id
            }
        });

        return TodoEntity.fromObject(deletedTodo);
    }
}