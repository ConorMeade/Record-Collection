import { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'semantic-ui-react';
import './App.css';
import { AddAlbumForm } from "./components/AddAlbumForm"
import { Albums } from "./components/Albums" 
import { Slideshow } from './components/Slideshow';


function App() {
  const [albums, setAlbums] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [albumListOpen, setAlbumListOpen] = useState(false)

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time)
    })
  }, [])

  // fetching data from api, setting album state to data we fetched
  useEffect(() => {
    fetch('/albums').then(response => response.json()).then(data => {
      setAlbums(data.albums)
    })
  }, [])

  return (
    <Container styles>
        <p>The current time is {currentTime}.</p>
          <br />
          <Slideshow albums={albums}/>
          <br />
          <br />
          <AddAlbumForm onNewAlbum={album => 
              setAlbums(currentAlbums => [album, ...currentAlbums])}
          />
          <Modal
            onClose={() => setAlbumListOpen(false)}
            onOpen={() => setAlbumListOpen(true)}
            open={albumListOpen}
            trigger={
              <Button.Group floated="right">
                <Button>Full Album List</Button>
              </Button.Group>
            }
          >
              <Albums albums={albums} />
          </Modal>


      </Container>
  )
}

export default App;
