import express from "express";
import PostController from "@controllers/PostController";

export default function (app: express.Express) {
    const postController: PostController = PostController.instance();
    app.route('/post')
        .get(postController.index)
        .post(postController.create);
    app.route('/post/:id')
        .get(postController.show)
        .put(postController.update)
        .patch()
        .delete(postController.delete);
}