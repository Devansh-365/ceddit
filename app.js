const express = require("express");
const cors = require("cors");

const app = express();
const config = require("dotenv").config();
const connect = require("./utils/connect");
const userRouter= require("./Routes/userRoutes");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.use('/user',userRouter);
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
  connect()
 
});
