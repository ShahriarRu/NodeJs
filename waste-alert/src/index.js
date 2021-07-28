const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const dataRouter = require("./routers/data");

const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(dataRouter);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
