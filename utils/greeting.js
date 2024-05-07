const { loadTasks } = require("./todo");

const users = loadTasks();
const currDate = new Date();
const currHour = currDate.getHours();

const printDate = () => {
    console.log(currHour);
};

const greeting = (nama) => {
    const morning = `Good Morning ${nama} Have a Nice Day:D`;
    const noon = `Good Afternoon ${nama} Keep it Up ^o^`;
    const night = `Good Night ${nama} Have a Nice Dream ^_^`;

    if (currHour >= 5 && currHour < 12) {
        return morning;
    } else if (currHour >= 12 && currHour < 18) {
        return noon;
    } else {
        return night;
    }
};

module.exports = {
    printDate,
    greeting,
};
