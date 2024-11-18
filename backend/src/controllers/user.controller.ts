import { Request, Response } from "express";
import { User } from "../types/user";
import bcrypt from "bcrypt"
import userModel from "../models/user.model";

const getUsers = (req: Request, res: Response): void => {
    const users = userModel.findAll()
    res.json(users)
}

const getUserById = (req: Request <{ id: string }>, res: Response) => {
    const { id } = req.params
    const user = userModel.findById(id)
    if(!user){
        res.status(404).json({ message: "User not found" })
    }
    res.json(user)
}

const registerUser = async(req: Request<{}, {}, Omit<User, "id">>, res: Response): Promise<void> => {
    const { username, password, firstname, lastname, email } = req.body
    const checkIfUserExists = userModel.findByUsername(username)

    if(checkIfUserExists){
        res.status(409).json({ message: "Username taken" })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = userModel.create({ username, firstname, lastname, email, password: hashedPassword})
    res.status(201).json(user)
} 

const loginUser = async(req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
    const { username, password } = req.body
    const user = userModel.findByUsername(username)
    if(!username || !password){
        res.status(404).json({ message: "Missing username or password" })
        return
    }
    if(!user){
        res.status(404).json({ messsage: "User not found" })
        return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        res.status(403).json({ message: "Incorrect Password" })
        return
    }
    req.session!.isAuthenticated = true
    req.session!.userId = user.id
    res.json({ message: "Login successful" })
}

const userProfile = (req: Request, res: Response): void => {
    const { userId } = req.session
    const user = userModel.findById(userId)
    res.json(user)
}

const logoutUser = (req: Request, res: Response): void => {
    req.session = { isAuthenticated: false, userId: '' }
    res.json({ message: "Logged out" })
}

export default {
    registerUser, 
    getUserById,
    getUsers, 
    loginUser,
    userProfile, 
    logoutUser
}