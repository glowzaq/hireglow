import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import errorHandler from "./middleware/errorHandler.js";
const app = express()
app.use(cors())
app.use(express.json())
app.use((req, res, next)=>{
    res.set("Cache-Control", "no-store")
    next()
})
app.use("/api/auth", authRoutes)
app.use("/api/user", protectedRoutes)
app.use(errorHandler)

export default app;