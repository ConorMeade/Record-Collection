import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from "semantic-ui-react"
import './AlbumForm.css'



export const AddAlbumForm = ({ onNewAlbum }) => {
    const [windowOpen, setWindowOpen] = useState(false)
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
        <>
        <Modal
            size='large'
            onClose={() => setWindowOpen(false)}
            onOpen={() => setWindowOpen(true)}
            open={windowOpen}
            trigger={<Button>Add A New Album</Button>}
        >
        <Modal.Header>Add A New Album</Modal.Header>
            <Modal.Content>
            <Form>
                <Form.Group widths="equal">
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
                    </Form.Group>
                    <Form.Group widths="equal">
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
                </Form.Group>
                <Form.Field>
                    <Modal.Actions>
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
                                    //alert
                                    console.log("Response worked!")
                                    onNewAlbum(album)
                                    // windowOpen(false)
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
                        <Button color = 'black' onClick={() => setWindowOpen(false)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Form.Field>
            </Form>
            </Modal.Content>
        </Modal>
        </>
    )
}
