const triggerFunc = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

const dropTriggerFunc = `DROP FUNCTION trigger_set_timestamp()`

exports.up = function(knex, Promise) {
    return knex.raw(triggerFunc);
};

exports.down = function(knex, Promise) {
  return knex.raw(dropTriggerFunc);
};
