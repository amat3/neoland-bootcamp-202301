import { useState, useEffect } from 'react'
import retrievePublicStickies from '../logic/retrieve-public-stickies'
import updateStickyText from '../logic/update-sticky-text'
import deleteSticky from '../logic/delete-sticky'
import updateStickyVisibility from '..//logic/update-sticky-visibility'
import toggleLikeSticky from '../logic/toggle-like-sticky'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'

function List({ listUpdateStamp }) {
    console.log('List -> render')

    const [updateStamp, setUpdateStamp] = useState(Date.now())
    const [stickies, setStickies] = useState([])

    useEffect(() => {
        try {
            retrievePublicStickies((error, stickies) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setStickies(stickies.reverse())
            })
        } catch (error) {
            alert(error.message)
        }
    }, [listUpdateStamp, updateStamp])

    const handleUpdateText = event => {
        try {
            updateStickyText(sessionStorage.userId, event.target.id, event.target.innerText, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDelete = event => {
        try {
            deleteSticky(sessionStorage.userId, event.target.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUpdateStamp(Date.now())
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateVisibility = event => {
        try {
            updateStickyVisibility(sessionStorage.userId, event.target.id, event.target.dataset.visibility === 'public' ? 'private' : 'public', error => {
                if (error) {
                    alert(error.message)

                    return
                }

                setUpdateStamp(Date.now())
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLike = event => {
        try {
            toggleLikeSticky(sessionStorage.userId, event.currentTarget.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                setUpdateStamp(Date.now())
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <ul className="flex flex-col items-center">
        {stickies.map(sticky => <li key={sticky._id} className='border rounded-md bg-white p-3 m-3 w-[40ch] text-right'>
            <div className="">
                {sticky.user === sessionStorage.userId && <button className="bg-blue-600 border border-gray-400 m-0.5 rounded-md h-8 w-8" id={sticky._id} data-visibility={sticky.visibility} onClick={handleUpdateVisibility}>🚦</button>}

                {sticky.user === sessionStorage.userId && <button className="bg-blue-600 border border-gray-400 m-0.5 rounded-md h-8 w-8" id={sticky._id} onClick={handleDelete}>❌</button>}

                {
                    //sticky.user === sessionStorage.userId ?
                    //     <p id={sticky.id} contentEditable onKeyUp={handleUpdateText} suppressContentEditableWarning={true}>{sticky.text}</p>
                    //     :
                    //     <p id={sticky.id}>{sticky.text}</p>
                }
                {/* <p id={sticky.id} contentEditable={sticky.user === sessionStorage.userId? true : false} onKeyUp={handleUpdateText} suppressContentEditableWarning={true}>{sticky.text}</p> */}
            </div>

            <p className="text-xl pt-5 text-left" id={sticky._id} contentEditable={sticky.user === sessionStorage.userId} onKeyUp={handleUpdateText} suppressContentEditableWarning={true}>{sticky.text}</p>
            <div className="flex justify-end gap-1">
                <button className="w-5 pb-0 cursor-pointer" onClick={handleLike} id={sticky._id}>{sticky.likes.includes(sessionStorage.userId) ? <HeartIcon /> : <HeartIconOutline />} </button>
                <p title={sticky.likes.join('\n')}>{sticky.likes.length}</p>
            </div>
            <strong className="text-gray-500 p-1 font-spline">{sticky.user}</strong>
        </li>)}
    </ul>
}

export default List