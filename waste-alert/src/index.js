const express = require("express");
require("./db/mongoose");
var cors = require("cors");
const userRouter = require("./routers/user");
const dataRouter = require("./routers/data");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.options("*", cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   // res.header("Access-Control-Allow-Credentials", true);

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(express.json());
app.use(userRouter);
app.use(dataRouter);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
