function MyList() {
    console.log('MyList -> render')

    const [listUpdateStamp, setListUpdateStamp] = React.useState(Date.now())

    let stickies

    try {
        stickies = retrieveMyStickies(sessionStorage.email)
    } catch (error) {
        alert(error.message)
    }

    const handleUpdateText = event => {
        try {
            updateStickyText(sessionStorage.email, event.target.id, event.target.innerText)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDelete = event => {
        try {
            deleteSticky(sessionStorage.email, event.target.id)

            setListUpdateStamp(Date.now())
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateVisibility = event => {
        try {
            updateStickyVisibility(sessionStorage.email, event.target.id, event.target.dataset.visibility === 'public' ? 'private' : 'public')
            
            setListUpdateStamp(Date.now())
        } catch (error) {
            alert(error.message)
        }
    }

    const handleLike = event => {
        try {
            toggleLikeSticky(sessionStorage.email, event.target.id)

            setListUpdateStamp(Date.now())
        } catch(error) {
            alert(error.message)
        }
    }

    return <ul className="flex flex-col items-center">
        {stickies.map(sticky => <li key={sticky.id} className='border rounded-md bg-white p-3 m-3 w-[40ch] text-right'>
            <div className='flex justify-end align-center'>
                {sticky.visibility === 'private' ? <p>⛔️ private</p> : <p>👨‍👩‍👧‍👦 public</p>}
                
                <button className="bg-blue-600 border border-gray-400 m-0.5 rounded-md h-8 w-8" id={sticky.id} data-visibility={sticky.visibility} onClick={handleUpdateVisibility}>🚦</button>

                <button className="bg-blue-600 border border-gray-400 m-0.5 rounded-md h-8 w-8" id={sticky.id} onClick={handleDelete}>❌</button>
            </div>

            <p className="text-xl pt-5 text-left" id={sticky.id} contentEditable onKeyUp={handleUpdateText} suppressContentEditableWarning={true}>{sticky.text}</p>
            <div className="flex justify-end gap-1">
                <img className="w-5 pb-0 cursor-pointer" src={sticky.likes.includes(sessionStorage.email) ? "public/heart-full.svg" : "public/heart.svg" } onClick={handleLike} id={sticky.id}></img>
                <p title={sticky.likes.join('\n')}>{sticky.likes.length}</p>
            </div>
            <strong className="text-gray-500 p-1">{sticky.user}</strong>
        </li>)}
    </ul>
}