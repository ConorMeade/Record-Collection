import React, { useState } from 'react';


const AddAlbumForm = (props) => {
    const initialFormState = { id: null, album: '', artist: '', mbid: ''}
    const [album, setAlbum] = useState(initialFormState)

    const handleIntputChange = (e) => {
        const { name, value } = e.target
        console.log(e)
        setAlbum({ ...album, [name] : value})
    }

    return(
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if(!album.album || !album.artist) return

                props.addAlbum(album)
                setAlbum(initialFormState)
            }}
        >
            <label>Album Title: </label>
            <input type="text" name="album" value={album.album} onChange={handleIntputChange}/>
            <label>Artist: </label>
            <input type="text" name="artist" value={album.artist} onChange={handleIntputChange}/>
            <button>Add Album</button>
        </form>
    )
}

export default AddAlbumForm