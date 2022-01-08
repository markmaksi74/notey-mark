//jshint esversion:6
let port = process.env.PORT
if (port == null || port == "") {
  port = 8000
}

const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const {getDefaultList, getCustomList, postDefaultList, deleteItem} = require("./controller/lists.controller")

const app = express();
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('secretURL');
}

app.get("/", getDefaultList);

app.get("/:customListName", getCustomList);

app.post("/", postDefaultList);

app.post("/delete", deleteItem);

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(port, function() {
  console.log("Server started on port" + port);
});
