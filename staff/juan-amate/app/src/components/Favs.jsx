import { useState, useEffect } from 'react'
import retrieveFavStickies from '../logic/retrieve-fav-stickies'
import Container from '../library/Container'
import Item from './Item'

function Favs({ listUpdateStamp, user, onToggleFav }) {
    console.log('Favs -> render'
    )
    const [stickies, setStickies] = useState([])

    const loadList = () => {
        try {
            retrieveFavStickies(sessionStorage.token, (error, stickies) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setStickies(stickies)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        loadList()
    }, [listUpdateStamp])

    const handleChangeColor = (stickyId, color) => {
        setStickies(stickies => {
            const index = stickies.findIndex(sticky => sticky.id === stickyId)

            const sticky = stickies[index]

            const stickyUpdated = { ...sticky }
            stickyUpdated.color = color

            const stickiesUpdated = [...stickies]

            stickiesUpdated[index] = stickyUpdated

            return stickiesUpdated
        })
    }

    const handleRemoveFromList = stickyId => {
        setStickies(stickies => {
            const index = stickies.findIndex(sticky => sticky.id === stickyId)

            const stickiesUpdated = [...stickies]

            stickiesUpdated.splice(index, 1)

            return stickiesUpdated
        })
    }

    const handleToggleLike = (userId, stickyId) => {
        setStickies(stickies => {
            const index = stickies.findIndex(sticky => sticky.id === stickyId)

            const sticky = stickies[index]

            const stickyUpdated = { ...sticky }
            stickyUpdated.likes = [...sticky.likes]

            const { likes } = stickyUpdated

            const indexOfUser = likes.indexOf(userId)

            if (indexOfUser < 0)
                likes.push(userId)
            else
                likes.splice(indexOfUser, 1)

            const stickiesUpdated = [...stickies]

            stickiesUpdated[index] = stickyUpdated

            return stickiesUpdated
        })
    }

    const handleUpdateVisibility = (stickyId, visibility) => {
        setStickies(stickies => {
            const index = stickies.findIndex(sticky => sticky.id === stickyId)

            const sticky = stickies[index]

            const stickyUpdated = { ...sticky }
            stickyUpdated.visibility = visibility

            const stickiesUpdated = [...stickies]

            stickiesUpdated[index] = stickyUpdated

            return stickiesUpdated
        })
    }

    const handleToggleFav = (userId, stickyId) => {
        setStickies(stickies => {
            const newStickies = [...stickies]

            const index = newStickies.findIndex(sticky => sticky.id === stickyId)

            newStickies.splice(index, 1)

            return newStickies
        })

        onToggleFav(userId, stickyId)
    }

    return <Container TagName='ul'>
        {stickies.map(sticky => <Item element={sticky} key={sticky.id} onUpdateVisibility={handleUpdateVisibility} onDelete={handleRemoveFromList} onToggleLike={handleToggleLike} onChangeColor={handleChangeColor} onToggleFav={handleToggleFav} user={user} />)}
    </Container>
}

export default Favs