import knex from 'knex';


class DB {
    private knex: knex ;

    constructor() {
        this.knex = knex({
            client: "postgresql",
            connection: {
              database: "watchlistadb",
              user: "postgres",
              password: "root"
            },
            pool: {
              min: 2,
              max: 10
            }
          });
    }

    public get query(): knex {
        return this.knex;
    }

    public tx(cb: (trx: knex.Transaction) => Promise<any>): Promise<any> {
        return this.knex.transaction(cb);
    }

}

export default DB;


