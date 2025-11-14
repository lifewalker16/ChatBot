import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT =8080;

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api",chatRoutes);

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`);
    
});
