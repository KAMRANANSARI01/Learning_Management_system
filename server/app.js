import  express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js"
import errorMiddleware from "./middleware/error.middleware.js";
config();
const app = express();
app.use(morgan('dev'))
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    Credential:true
}))

app.use("/api/v1/user",userRoutes)
app.use(express.json())
app.use(cookieParser)
app.use("/",(req,res)=>{
    res.send("hello world")
})
app.all("*",(req,res)=>{
    res.sataus(404).send("OOPS!! Page not found")
})

app.use(errorMiddleware);

export default app;