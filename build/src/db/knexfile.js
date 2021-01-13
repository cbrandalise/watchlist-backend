"use strict";
// Update with your config settings.
require('ts-node/register');
const path = require('path');
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: "watchlistadb",
            user: "postgres",
            password: "root"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations",
            directory: path.resolve("./migrations"),
        },
        seeds: {
            directory: './db/seeds',
        }
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
