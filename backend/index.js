import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

const port = process.env.DB_PORT || 5001;
const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
connectDB();

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
