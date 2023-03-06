import { validateUserId, validateNewEmail, validatePassword, validateCallback } from 'com'
/**
 * Updates the user email
 * 
 * @param {string} userId The user id
 * @param {string} newEmail The user new email
 * @param {string} password The user password
 * @param {function} callback The callback
 */
function updateUserEmail(userId, newEmail, password, callback) {
    validateUserId(userId)
    validateNewEmail(newEmail)
    validatePassword(password)
    validateCallback(callback)

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { status } = xhr

        if (status === 500) {
            const { response } = xhr

            const body = JSON.parse(response)

            const { error } = body

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.open('PATCH', 'http://localhost:8080/users/email')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { newEmail, password }
    const json = JSON.stringify(payload)
    xhr.send(json)
}

export default updateUserEmail