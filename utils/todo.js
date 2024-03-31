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

module.exports = {
    loadTasks,
};
