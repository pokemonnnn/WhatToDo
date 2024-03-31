const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

const { loadTasks } = require("./utils/todo");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
    const users = loadTasks();
    res.render("index", {
        title: "List",
        users,
        layout: "layout/main-layout",
    });
});

app.get("/add", (req, res) => {
    res.render("add", {
        title: "Add Task",
        layout: "layout/main-layout",
    });
});

app.get("/done", (req, res) => {
    res.render("done", {
        title: "Done Task",
        layout: "layout/main-layout",
    });
});

app.use((req, res) => {
    res.status(404);
    res.send("404 Halaman tidak ditemukan");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
