import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.DB_PORT || 3001;
import { app, server } from "./socket/socket.js";


connectDB();

app.use("/user", userRoutes);
app.get("/", (req, res) => {
  console.log("hello. this is working");
  res.send("hello, this is working");
});
server.listen(port, () => {
  console.log(`server running at ${port}`);
});
