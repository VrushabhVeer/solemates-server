import express from "express";
import cors from "cors";

const app = express();

// common middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoints

app.get("/", (req, res) => {
  res.send("welcome to solemates");
});

export default app;
