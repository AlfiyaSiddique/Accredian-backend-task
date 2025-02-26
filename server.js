// server.js
import express from "express"
import cors from "cors"
import referralRouter from "./route.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', referralRouter)

app.get("/", (req, res)=>{
    res.json({message: "Job referral server"})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
