import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDataSource {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;

    abstract getById(id: number): Promise<TodoEntity | undefined>;

    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    abstract deleteById(id: number): Promise<TodoEntity>;
} 