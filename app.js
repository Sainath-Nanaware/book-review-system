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

//user routes
const userRoutes=require('./routes/userRoutes')
app.use("/user",userRoutes)

//book routes
const bookRoutes=require('./routes/bookRoutes')
app.use("/books",bookRoutes)

//review routes
const reviewRoutes=require('./routes/reviewRoutes')
app.use("/review",reviewRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
