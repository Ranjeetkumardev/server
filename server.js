import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/userRouter.js";
import auth from "./middlewares/auth.js";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)


const app = express();

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "/client/build")))

app.get("*", (req, res) => res.sendFile(path.join(__dirname , "/client/build/index.html")))

app.use(cors())
mongoose
  .connect("mongodb://127.0.0.1:27017/Full-Stack-DB", {})
  .then(() => {
    app.listen(port, () => {
        console.log(`database connected and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.use(router);

// app.use(
//   session({
//     secret: "thisisnodecourse",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set secure to true in production for HTTPS
//   })
// );


app.get("/user",  auth,(req, res) => {
  res.send("Hello I'm expres from your wardword..");
});
