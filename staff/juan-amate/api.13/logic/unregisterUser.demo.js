const { connect, disconnect } = require('mongoose')
const unregisterUser = require('./unregisterUser')

connect('mongodb://127.0.0.1:27017/mydb')
    .then(() => {
        return unregisterUser('6400beb7a38449370265cde4', '123123123')
    })
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => disconnect())