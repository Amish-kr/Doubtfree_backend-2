import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/users";
import serverless from "serverless-http";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://main--effortless-froyo-5575b8.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.json({
    message: "Hello, this is the welcome page.",
    path: "/"
  });
});

app.use("/.netlify/functions/index", routes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = "mongodb+srv://dishu01082003:98765432d@dishant.kamiqo8.mongodb.net/";

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

export const handler = serverless(app);
