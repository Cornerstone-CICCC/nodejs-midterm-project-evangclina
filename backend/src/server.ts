import express, { Request, Response } from "express"
import cors from "cors"
import cookieSession from "cookie-session"
import userRouter from "./routes/user.routes"
import dreamRouter from "./routes/dream.routes"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:4321", 
    credentials: true
}))
app.use(cookieSession({
    name: "session",
    keys: [
        process.env.COOKIE_SIGN_KEY ?? "db5c4523bbc",
        process.env.COOKIE_ENCRYPT_KEY ?? "373bddkjvjd",
    ],
    maxAge: 60 * 60 * 1000
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/users", userRouter)
app.use("/dreams", dreamRouter)

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Invalid Route" })
})

// start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})