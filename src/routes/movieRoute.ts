import {Express} from "express";
import MovieController from "@controllers/MovieController";

export default function (app: Express): void {
    const movieController: MovieController = MovieController.instance();
    app.route('/movie')
        .get(movieController.index)
        .post(movieController.store);

    app.route('/movie/:id')
        .get(movieController.show)
        .put(movieController.update)
        .patch()
        .delete(movieController.delete);
}
