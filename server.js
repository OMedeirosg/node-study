if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(__dirname + "../public"));

const dbURL = process.env.DATABASE_URL;

const mongoose = require("mongoose");
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
