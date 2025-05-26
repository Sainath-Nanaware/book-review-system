const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const port =process.env.PORT || 4000

const connectDB=require('./config/db')
connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
