const booleanFromString = (str) => {
  if (typeof str !== "string") return str;
  if (str === "false") return false;
  if (str === "true") return true;
};

module.exports = booleanFromString;
