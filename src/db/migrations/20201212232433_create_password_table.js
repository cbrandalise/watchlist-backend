
exports.up = function(knex, Promise) {
  return knex.schema.createTable('password', t => {
      t.uuid('password_id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
      t.text('hash').notNullable();
      t.text('salt').notNullable();
      t.uuid('user_id').references('user_id').inTable('user');
      t.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('password');
};
