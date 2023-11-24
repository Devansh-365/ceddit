const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connect = require("./utils/connect");
const users = require("./routes/user.route");
const posts = require("./routes/post.route");
const community = require("./routes/community.route");
const comment = require("./routes/comment.route");
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

const port = process.env.PORT || 4000;

app.use("/api/auth", users);
app.use("/api/posts", posts);
app.use("/api/communities", community);
app.use("/api/comment", comment);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
  connect();
});
