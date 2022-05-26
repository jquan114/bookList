// Dependencies
const express = require("express");
const res = require("express/lib/response");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-Override");
const booksController = require("./controllers/books")

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));


//////////////// Middleware///////////
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// controllers middleware
app.use('/books',booksController); // changed middleware



//////////////// Listenter////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is listening on port: ${PORT}`);
});
