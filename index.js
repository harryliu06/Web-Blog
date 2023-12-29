import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let arr = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("create.ejs");
});

app.get("/view", (req, res) => {
  console.log("Hi this is running");
  res.render("view.ejs", {
    data: arr,
    length: arr.length,
  });
});

app.post("/submit", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  arr.push([title, content]);
  res.render("view.ejs", {
    data: arr,
    length: arr.length,
  });
});

app.post("/edit", (req, res) => {
  const idx = req.body["index"];
  res.render("edit.ejs", {
    index: idx,
    data: arr,
    existedData: arr[idx],
  });
});

app.post("/save", (req, res) => {
  let index = req.body["index"];
  arr[index][0] = req.body["title"];
  arr[index][1] = req.body["content"];

  res.render("view.ejs", {
    data: arr,
    length: arr.length,
  });
});

app.post("/view", (req, res) => {
  let index = req.body["index"];

  arr.splice(index, 1);

  res.render("view.ejs", {
    data: arr,
    length: arr.length,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
