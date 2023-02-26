const { ObjectId } = require('mongodb')

function updateStickyVisibility(userId, stickyId, visibility) {
    const stickies = process.db.collection('stickies')

    return stickies.findOne({ '_id': new ObjectId(stickyId) })
        .then(sticky => {
            if (!sticky)
                throw new Error(`sticky with id ${stickyId} not found`)

            if (sticky.user !== userId)
                throw new Error(`sticky with id ${stickyId} does not belong to user with id ${userId}`)

            return stickies.updateOne({ _id: new ObjectId(stickyId) }, { $set: { visibility } })
        })
}

module.exports = updateStickyVisibility