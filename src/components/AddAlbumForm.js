import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from "semantic-ui-react"


export const AddAlbumForm = ({ onNewAlbum }) => {
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [year, setYear] = useState(null)
    const [genre, setGenre] = useState("")
    const [date_added, setDateAdded] = useState(0)
    const [cover, setCover] = useState("")

    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
          setDateAdded(data.time)
        })
      }, [])

    return (
        <Form>
            <Form.Field>
                <Input
                    fluid label="Album Title"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    fluid label="Artist"
                    placeholder="Artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    fluid label="Year Released"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    fluid label="Album Genre"
                    placeholder="Genre"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    fluid label="Cover Art"
                    placeholder="Cover (use image url from discogs release page)"
                    value={cover}
                    onChange={e => setCover(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button
                    onClick={async () => {
                        const album = { title, artist, year, genre, date_added, cover };
                        const resp = await fetch('/add_album', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(album)
                        });

                        if(resp.ok){
                            console.log("Response worked!")
                            onNewAlbum(album)
                            setTitle("")
                            setArtist("")
                            setYear(0)
                            setGenre("")
                            setCover("")

                        }
                    }}
                >
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}



// const AddAlbumForm = (props) => {
//     const initialFormState = { id: null, album: '', artist: '', mbid: ''}
//     const [album, setAlbum] = useState(initialFormState)

//     const handleIntputChange = (e) => {
//         const { name, value } = e.target
//         console.log(e)
//         setAlbum({ ...album, [name] : value})
//     }

//     return(
//         <form
//             onSubmit={(e) => {
//                 e.preventDefault()
//                 if(!album.album || !album.artist) return

//                 props.addAlbum(album)
//                 setAlbum(initialFormState)
//             }}
//         >
//             <label>Album Title: </label>
//             <input type="text" name="album" value={album.album} onChange={handleIntputChange}/>
//             <label>Artist: </label>
//             <input type="text" name="artist" value={album.artist} onChange={handleIntputChange}/>
//             <button>Add Album</button>
//         </form>
//     )
// }

// export default AddAlbumForm