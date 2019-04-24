const knex = require('knex')

module.exports = app => {
    const {
        existsOrError,
        notExistsOrError
    } = app.api.validation

    const save = (req, res) => {
        const evaluation = {
            ...req.body
        }
        console.log(req.body)
        if (req.params.id) evaluation.id = req.params.id

        try {
            existsOrError(evaluation.pointEv, 'Pontuação não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (evaluation.id) {
            app.db('evaluation')
                .update(evaluation)
                .where({
                    id: evaluation.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('evaluation')
                .insert(evaluation)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Pontuação não informado.')

            const rowsDeleted = await app.db('evaluation')
                .where({
                    id: req.params.id
                }).del()
            existsOrError(rowsDeleted, 'Pontuação não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('users')
            // .select('evaluation')
            //.select('e.id', 'u.name', 'e.pointId', 'e.pointEv', 'u.id')
            //.where('e.id', 'u.id')
            // .orderBy('u.id', 'desc')
            .then(evaluation => res.json(evaluation))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('evaluation')
            .where({
                id: req.params.id
            })
            .first()
            .then(evaluation => res.json(evaluation))
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        remove,
        get,
        getById
    }
}