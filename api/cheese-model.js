const db = require('../data/dbConfig.js')

module.exports = {
  insert,
  getAll,
  getById,
  remove
}

function getAll() {
  return db('cheese')
}

function getById(id) {
  return db('cheese').where('id', id ).first()
}

async function insert(cheese) {
  return db('cheese').insert(cheese)
    .then(([id]) => {
      return getById(id)
    })
}

async function remove(id){
    return db('cheese').delete().where('id', id)
}
