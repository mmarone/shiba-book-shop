const fs = require("fs");

const request = () =>
  new Promise((resolve, reject) => {
    fs.readFile(`./tests/unit/mock/books.json`, "utf8", (err, data) => {
      if (err) reject(err);
      resolve({ entity: JSON.parse(data) });
    });
  });

export default request;
