const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const port = 3000;

const { loadTasks, findTask, check } = require("./utils/todo");
const { printDate, greeting } = require("./utils/greeting");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        resave: "true",
        saveUninitialized: "true",
    })
);

// LOGIN SESSION
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        layout: "layouts/auth-layout",
    });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const found = check(username, password);

    if (found) {
        req.session.user = found;
        res.redirect("/");
    } else {
        res.redirect("/login");
    }
});

// check login
const isLogin = (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        res.redirect("/login");
    } else {
        next();
    }
};

app.get("/", isLogin, (req, res) => {
    const user = req.session.user;
    // Sekarang user.username akan terisi jika pengguna berhasil login
    const letter = greeting(user.username);
    if (!user) {
        res.redirect("/login");
    } else {
        res.render("index", {
            title: "List",
            layout: "layouts/main-layout",
            user,
            letter,
        });
    }
});

app.get("/add", isLogin, (req, res) => {
    const user = req.session.user;
    res.render("add", {
        title: "Add Task",
        layout: "layouts/main-layout",
        user,
    });
});

app.get("/done", isLogin, (req, res) => {
    const user = req.session.user;
    res.render("done", {
        title: "Done Task",
        layout: "layouts/main-layout",
        user,
    });
});

app.get("/:task", isLogin, (req, res) => {
    const user = req.session.user;
    const task = findTask(req.params.task);
    res.render("detail", {
        title: "Task Detail",
        layout: "layouts/main-layout",
        task,
        user,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send("404 Halaman tidak ditemukan");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
