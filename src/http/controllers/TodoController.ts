import {Request,  Response} from "express";
import TodoModel from "@models/TodoModel";
import ITodo from "@interfaces/ITodo";

export default class TodoController {
    private static _instance: TodoController | undefined;
    private constructor() {}

    static instance(): TodoController {
        if(!this._instance) {
            this._instance = new TodoController();
        }
        return this._instance;
    }

    async index(req: Request, res: Response): Promise<void> {
        const todoModel = TodoModel.instance();
        const result = await todoModel.findMany();
        res.status(200)
            .json(result)
            .end();
    }
    async store(req: Request, res: Response): Promise<void> {
        const todoModel = TodoModel.instance();
        const data: ITodo = req.body;
        await todoModel.create({
            data: data
        });
        res.status(201)
            .end();
    }
    async show(req: Request, res: Response): Promise<void> {
        const todoModel = TodoModel.instance();
        const id = Number(req.params.id);
        const result = await todoModel.findUnique({
            where: {
                id: id
            }
        });
        res.status(200)
            .json(result)
            .end();
    }
    async update(req: Request, res: Response): Promise<void> {
        const todoModel = TodoModel.instance();
        const id = Number(req.params.id);
        const data: ITodo = req.body;
        await todoModel.update({
            where: {
                id: id
            },
            data: data
        });
        res.status(200)
            .end();
    }
    async delete(req: Request, res: Response): Promise<void> {
        const todoModel = TodoModel.instance();
        const id = Number(req.params.id);
        await todoModel.delete({
            where: {
                id: id
            }
        });
        res.status(200)
            .end();
    }
}