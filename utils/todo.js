const fs = require("fs");

const dirPath = "./data";
const dataPath = "./data/data.json";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadTasks = () => {
    const file = fs.readFileSync(dataPath, "utf-8");
    const tasks = JSON.parse(file);

    return tasks;
};

const findTask = (task) => {
    const tasks = loadTasks();
    const foundTask = tasks.find((e) => e.title === task.title);
};

//Auth
const check = (user, pw) => {
    const users = loadTasks();
    const findUser = users.find((e) => user === e.username && pw === e.password);

    return findUser;
};

module.exports = {
    loadTasks,
    findTask,
    check,
};
