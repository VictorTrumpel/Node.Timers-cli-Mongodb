const Table = require("cli-table");
const { formatDuration } = require("./formatDuration");

const printTimers = (timersArray) => {
  try {
    const table = new Table({
      head: ["ID", "Task", "Time"],
      colWidths: [30, 30, 15],
    });

    timersArray.map((timer) => {
      const row = [`${timer._id}`, `${timer.description}`, `${formatDuration(timer.progress)} ⌛`];
      table.push(row);
    });

    console.log(table.toString());
  } catch (e) {
    console.log(e);
  }
};

module.exports.printTimers = printTimers;
