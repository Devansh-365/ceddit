const mongoose = require("mongoose");
const config = require("dotenv").config();

async function connect() {
  const dbUri = process.env.dbUri;

  try {
    await mongoose.connect(dbUri);
    console.log(" db connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connect;
