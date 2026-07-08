import express from "express";
import authRouter from "./routes/auth.route.js";
import handleError from "./middlewares/err.middleware.js";


const app = express()
app.use(express.json())

// prefix
app.use("/api/auth", authRouter)


app.use(handleError)

export default app;
