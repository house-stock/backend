import * as Knex from 'knex';
import Tables from '../src/db/tableNames';


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(Tables.USER_PRODUCTS, (table: Knex.CreateTableBuilder) => {
        table.increments('id')
        table.string('barcode')
        table.date('expiration')
        table.integer('quantity')
        table.integer('user_id').unsigned()
        // TODO: add primary key
        table.foreign('user_id').references(`${Tables.USERS}.id`)
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(Tables.USER_PRODUCTS)
}

