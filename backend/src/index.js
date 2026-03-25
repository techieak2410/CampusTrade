import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'node:url';
import cors from "cors";
import connectDb from './utils/db.js';
import listingRouter from './routes/listing.route.js';
import userRouter from './routes/user.route.js';

const app=express();

dotenv.config(); 
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) 

app.use(cors({
  origin: "*",
  credentials: true
}));

connectDb();

app.get('/',(req,res)=>{
    res.send("Hello \nWelcome to campus Trade \nYour Own Partner to Trade within your campus");
});

app.use('/listings',listingRouter);
app.use('/users',userRouter);

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`App is listening on http://localhost:${PORT}`);
})
