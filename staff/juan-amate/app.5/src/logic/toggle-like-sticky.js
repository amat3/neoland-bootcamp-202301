/**
 * Toggles the likeability of a specific sticky
 * 
 * @param{string} userId The user id
 * @param{string} stickyId The sticky identifier
 * @param{function} callback
 */
function toggleLikeSticky(userId, stickyId, callback) {
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

    xhr.open('PATCH', `http://localhost:8080/stickies/${stickyId}/likes`)
    xhr.setRequestHeader('Authorization', 'Bearer ' + userId)
    xhr.send()
}

export default toggleLikeSticky