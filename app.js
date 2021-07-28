const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/user.routes");

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

mongoose
  .connect(process.env.config_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (res) => {
      console.log("mongodb connected");
    },
    (err) => {
      console.log(err);
    }
  );

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("server up and running");
});
