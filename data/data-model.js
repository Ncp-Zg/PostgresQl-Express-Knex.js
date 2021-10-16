const db = require("./db-config");

module.exports = {
  findAktor,
  addAktor,
};

function findAktor() {
  return db("aktor");
}

function addAktor(yeniAktor) {
  return db("aktor")
    .insert(yeniAktor, "id")
    .then(([id]) => {
      return db("aktor").where({ id }).first();
    });
}
