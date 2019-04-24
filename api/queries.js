module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `,

    EvaluationIds: `
        WITH RECURSIVE subpoint(id) AS (
            SELECT id FROM users WHERE id = ?
            UNION ALL
            SELECT e.id FROM subpoint, users u
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subpoint
    `
}