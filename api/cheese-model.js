const db = require('../data/dbConfig.js')

module.exports = {
  insert,
  getAll,
  getById,
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
