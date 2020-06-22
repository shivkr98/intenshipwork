const morgan = require("morgan");
const http = require('http');
const express = require('express');

const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const server = http.createServer(app);


app.use(morgan("dev"));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
const db = require("./key").mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));




//router
app.use("/users", require("./router/users"));
app.use("/post", require("./router/post"));
app.use("/story", require("./router/story"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));