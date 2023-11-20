const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connect = require("./utils/connect");
const users = require("./routes/user.route");
const posts = require("./routes/post.route");
const community = require("./routes/community.route");

dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.use("/api/auth", users);
app.use("/api/posts", posts);
app.use("/api/community", community);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
  connect();
});
