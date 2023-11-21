const mongoose = require("mongoose");
const config = require("dotenv").config();

async function connect() {
  const dbUri = process.env.dbUri || "mongodb://mongo:27017";

  try {
    await mongoose.connect(dbUri);
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connect;
