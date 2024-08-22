import MovieModel from '@models/MovieModel';
import {Request, Response} from 'express';
import IMovie from "@interfaces/IMovie";

export default class MovieController {
    private static _instance: MovieController | undefined;
    private constructor() {}

    static instance() {
        if(!this._instance) {
            this._instance = new MovieController();
        }
        return this._instance;
    }

    async index(req: Request, res: Response): Promise<void> {
        const movieModel = MovieModel.instance();
        const response = await movieModel.findMany();
        res.status(200)
            .json(response)
            .end();
    }
    async store(req: Request, res: Response): Promise<void> {
        const movieModel = MovieModel.instance();
        const data: IMovie = req.body as IMovie;
        await movieModel.create({
            data: data
        });
        res.status(201)
            .end();
    }
    async show(req: Request, res: Response): Promise<void> {
        const movieModel = MovieModel.instance();
        const id = Number(req.params.id);
        const response = await movieModel.findUnique({
            where: {
                id: id
            }
        });
        res.status(200)
            .json(response)
            .end();
    }
    async update(req: Request, res: Response): Promise<void> {
        const movieModel = MovieModel.instance();
        const id = Number(req.params.id);
        const data: IMovie = req.body as IMovie;
        await movieModel.update({
            where: {
                id: id
            },
            data: data
        });
        res.status(200)
            .end();
    }
    async delete(req: Request, res: Response): Promise<void> {
        const movieModel = MovieModel.instance();
        const id = Number(req.params.id);
        await movieModel.delete({
            where: {
                id: id
            }
        });
        res.status(200)
            .end();
    }
}