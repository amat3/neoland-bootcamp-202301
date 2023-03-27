const { validateUserId, ExistenceError } = require('com')
const { User } = require('../data/models')

function retrieveAdminUser(userId) {
    validateUserId(userId)

    return User.findOne({ role: 'admin' })
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            delete user._id
            delete user.password
            delete user.__v

            return user
        })
}

module.exports = retrieveAdminUser