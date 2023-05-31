import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/users" // Import the routes module
import serverless from "serverless-http";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

routes.get("/", (req, res) => {
    res.json({
        message: "Hello, this is welcome page.",
        path: "/"
    });
});

// app.use('/', router);
app.use("/.netlify/functions/index", routes);
const PORT = 5000;

// const DATABASE_URL = "mongodb://127.0.0.1:27017/readycoder";
const DATABASE_URL = "mongodb+srv://dishu01082003:98765432d@dishant.kamiqo8.mongodb.net/";


mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        // app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)

        // })
    )
    .catch((err) => console.log(err.message));


// module.exports.handler = serverless(app);

export const handler = serverless(app);