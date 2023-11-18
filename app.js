const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = 4000;

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);

  //   connectToDb();
});
