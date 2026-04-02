import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import authRouter from "./routes/auth.routes.js";

connectDB();

app.use("/api/auth", authRouter);


app.listen(3000);