module.exports = app => {
    const {
        existsOrError,
        notExistsOrError
    } = app.api.validation

    const save = (req, res) => {
        const point = {
            id: req.body.id,
            name: req.body.name,
            point: req.body.point
        }
        console.log(req.body)
        if (req.params.id) point.id = req.params.id

        try {
            existsOrError(point.name, 'Nome não informado')
            existsOrError(point.point, 'Pontuação não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (point.id) {
            app.db('point')
                .update(point)
                .where({
                    id: point.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('2')
        } else {
            app.db('point')
                .insert(point)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                console.log('1')
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('point')
                .where({
                    id: req.params.id
                }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('point')
            .then(point => res.json(point))
            .catch(err => res.status(500).send(err))
            console.log('3')
    }

    const getById = (req, res) => {
        app.db('point')
            .where({
                id: req.params.id
            })
            .first()
            .then(point => res.json(point))
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        remove,
        get,
        getById
    }
}