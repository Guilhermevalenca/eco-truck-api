import PostModel from "@models/PostModel";
import { Request, Response } from "express";
import IPost from "@interfaces/IPost";


export default class PostController{
    private static _instance: PostController | undefined;
    private constructor(){}
    static instance(): PostController{
        if(!this._instance){
            this._instance = new PostController();
        }
        return this._instance;
    }

    async index (req:Request , res:Response):Promise<void>{
        const postModel = PostModel.instance();
        const posts = await postModel.findMany();
        res.status(200)
            .json(posts)
            .end();
    }
    async create (req:Request, res:Response):Promise<void>{
        const postModel = PostModel.instance();
        const data = req.body;
        await postModel.create({
            data:data
        });
        res.status(201)
            .end();
    }
    async show (req:Request, res:Response):Promise<void>{
        const postModel = PostModel.instance();
        const id = Number(req.params.id);
        const post = await postModel.findUnique({
            where:{
                id : id
            }
        })
        res.status(200)
            .json(post)
            .end();
    }
    async update (req:Request, res:Response):Promise<void>{
        const postModel = PostModel.instance();
        const id = Number(req.params.id);
        const data: IPost= req.body;
        await postModel.update({
            where:{
                id:id
            },
            data:data
        });
        res.status(200)
            .end();
    }
    async delete(req:Request, res:Response):Promise<void>{
        const postModel = PostModel.instance();
        const id = Number(req.params.id);
        await postModel.delete({
            where:{
                id:id
            }
        });
        res.status(200)
            .end();
    }
}