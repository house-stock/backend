import * as Knex from "knex";
import Tables from "../src/db/tableNames";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(Tables.USERS, (table)=>{
        table.increments('id')
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(Tables.USERS)
}

