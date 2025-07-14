import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import todoRoute from "./routes/todo.route.js"
import cors from 'cors'
// import cookieParser from "cookie-parser"


const app = express()
const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
// app.use(cookieParser())

app.use("/api/v1/user", userRoute)
app.use("/api/v1/todo", todoRoute)

app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    connectDB()
})

