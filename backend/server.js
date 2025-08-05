import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { emailSender } from "./services/email.js";

dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
