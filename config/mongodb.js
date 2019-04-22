const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://knowledge:knowledge@knowledge-stats-jl37c.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    })
    .catch(e => {
        const msg = 'Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })