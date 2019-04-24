exports.up = function (knex, Promise) {
    return knex.schema.createTable('point', (table) => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('point').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('point')
};