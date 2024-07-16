import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';

const port = process.env.DB_PORT || 5001;
const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
connectDB();

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
