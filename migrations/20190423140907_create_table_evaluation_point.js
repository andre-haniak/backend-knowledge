exports.up = function (knex, Promise) {
    return knex.schema.createTable('evaluation', (table) => {
        table.increments('id').primary()
        table.string('pointEv').notNull()
        table
            .integer('userId')
            .references('id')
            .inTable('users')
            .notNull()
        table
            .integer('pointId')
            .references('id')
            .inTable('point')
            .notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('evaluation')
};