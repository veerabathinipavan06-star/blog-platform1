const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes =
require("./routes/userRoutes");

const postRoutes =
require("./routes/postRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);


/* CONNECT MONGODB */

mongoose.connect(
"mongodb+srv://pavankumar:pavan%402005@cluster0.zvaxqed.mongodb.net/blogDB?retryWrites=true&w=majority"
)

.then(()=>{

  console.log("MongoDB Connected");

})

.catch((error)=>{

  console.log(error);

});

/* ROUTE */

app.get("/", (req,res)=>{

  res.send("Server Running");

});

/* SERVER */

app.listen(5000, ()=>{

  console.log("Server Started");

});