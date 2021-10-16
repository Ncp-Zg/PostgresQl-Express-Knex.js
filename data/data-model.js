const db = require("./db-config");

module.exports = {
  findAktor,
  addAktor,
  updateAktor,
  deleteAktor,
  finAktorById
};

function findAktor() {
  return db("aktor");
}

function finAktorById(id){
    return db("aktor").where({id}).first();
}

function addAktor(yeniAktor) {
  return db("aktor")
    .insert(yeniAktor, "id")
    .then(([id]) => {
      return db("aktor").where({ id }).first();
    });
}

function updateAktor (updatedAktor, id) {
    return db("aktor")
    .update(updatedAktor)
    .where({id})
    .then(()=>{
        if(updated){
            return db("aktor").where({id}).first();
        }
    })
}

function deleteAktor(id) {
    return db("aktor").del().where({id});
}
