const fetch = require("node-fetch");


module.export = (...args) => {
  return fetch.apply(null, args).then((res) => {
    return res.json();
  });
}
