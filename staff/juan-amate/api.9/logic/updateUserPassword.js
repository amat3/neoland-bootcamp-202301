const { ObjectId } = require('mongodb')

function updateUserPassword(userId, currentPassword, newPassword, newPasswordRepeat) {
    if (typeof userId !== 'string') throw new Error('userId is not a string')
    if (typeof currentPassword !== 'string') throw new Error('currentPassword is not a string')
    if (currentPassword.length < 8) throw new Error('currentPassword is shorter than 8 characters')
    if (typeof newPassword !== 'string') throw new Error('newPassword is not a string')
    if (newPassword.length < 8) throw new Error('newPassword is shorter than 8 characters')
    if (typeof newPasswordRepeat !== 'string') throw new Error('newPasswordRepeat is not a string')
    if (newPasswordRepeat.length < 8) throw new Error('newPasswordRepeat is shorter than 8 characters')

    if (currentPassword === newPassword) throw new Error('current password and new password are equal')

    if (newPassword !== newPasswordRepeat) throw new Error('new password and new password repeat do not match'))

    const users = process.db.collection('users')

    const filter = { _id: new ObjectId(userId) }

    return users.findOne(filter)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            if (user.password !== currentPassword) throw new Error('wrong credentials')

            return users.updateOne(filter, { $set: { password: newPassword } })
        })
}

module.exports = updateUserPassword