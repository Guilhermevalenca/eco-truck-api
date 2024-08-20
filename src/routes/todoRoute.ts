import {Express} from "express";
import TodoController from "@controllers/TodoController";

export default function (app: Express) {
    const todoController: TodoController = TodoController.instance();
    app.route('/todo')
        .get(todoController.index)
        .post(todoController.store);
    app.route('/todo/:id')
        .get(todoController.show)
        .put(todoController.update)
        .patch()
        .delete(todoController.delete);
}