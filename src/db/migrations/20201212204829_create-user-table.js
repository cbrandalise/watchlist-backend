const { updatedAtTrigger } = require('../utils');

exports.up = function up(knex, Promise) {
  return knex.raw('create extension "uuid-ossp";')
    .then(() => {
      return knex.schema.createTable('user', (t) => {
        t.uuid('user_id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
        t.text('email').notNullable().unique();
        t.text('first_name').notNullable();
        t.text('last_name').notNullable();
        t.boolean('account_confirmed').notNullable().defaultTo(false);
        t.boolean('account_locked').notNullable().defaultTo(false);
        t.timestamps(true, true);
      })
    })
    .then(() => knex.raw(updatedAtTrigger('user')));
}

exports.down = function down(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('user'),
      knex.raw('DROP extension "uuid-ossp";')
    ]);
}
