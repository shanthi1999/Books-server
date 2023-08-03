exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('books').del();
  const data = require('../src/entity/DBUtils/sampleBookData');
  await knex('books').insert(data);
};
