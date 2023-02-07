import express from "express";
import mongoose from "mongoose";
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://Bogdan:dMATlKVAmXztunH7@cluster0.bwgsejj.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error (помилка)", err));
const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
