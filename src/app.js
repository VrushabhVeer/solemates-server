import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import wishListRouter from "./routes/wishlist.routes.js";
import addressRouter from "./routes/address.routes.js";

const app = express();

// common middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoints

app.get("/", (req, res) => {
  res.send("welcome to solemates");
});

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/address", addressRouter);

export default app;
