import { Request, Response } from "express";
import dreamModel from "../models/dream.model";
import { Dream } from "../types/dream";

const getDreams = (req: Request, res: Response): void => {
    const { userId } = req.session
    const dreams = dreamModel.getAll()
    res.json(dreams)
}

const getDreamById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const dream = dreamModel.findById(id)
    if(!dream){
        res.status(404).json({ message: "Dream not found" })
        return
    }
    res.json(dream)
}

const addDream = (req: Request<{}, {}, Omit<Dream, "id">>, res: Response) => {
    const { userId } = req.session
    const { title, content } = req.body
    if(!title || !content){
        res.status(400).json({ message:"Missing title or user id" })
        return
    }
    const dream = dreamModel.create({ title, content, userId })
    res.status(201).json(dream)
}

const updateDreamById = (req: Request<{ id: string }>, res: Response) => {
    const { userId } = req.session
    const { id } = req.params
    const { title, content } = req.body

    const dream = dreamModel.edit( id, { title, content, userId })

    if(!dream){
        res.status(404).json({ message: "Dream not found" })
        return
    }
    res.json(dream)
}

const deleteDreamById = (req: Request<{ id: string }>, res: Response) => {
    const { userId } = req.session
    const{ id } = req.params
    const response = dreamModel.delete(id, userId)
    if(!response){
        res.status(404).json({ message: "Dream not found" })
        return
    }
    res.status(204).send()
}

export default {
    getDreams,
    getDreamById, 
    addDream, 
    updateDreamById, 
    deleteDreamById
}