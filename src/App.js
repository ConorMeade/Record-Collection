import { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'semantic-ui-react';
import './App.css';
import { AddAlbumForm } from "./components/AddAlbumForm"
import { Albums } from "./components/Albums" 
import { Slideshow } from './components/Slideshow';
// import AddAlbumForm from './AddAlbumForm'
// import AlbumTable from './AlbumTable'

function App() {
  const [albums, setAlbums] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [addOpen, setAddOpen] = useState(false)
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

  // console.log(albumMbids);


  console.log(albums)
  return (
    <Container styles>
        <p>The current time is {currentTime}.</p>
          <br />
          <Slideshow albums={albums}/>
          <br />
          <br />
          <Modal
            className="New-Album-Btn"
            onClose={() => setAddOpen(false)}
            onOpen={() => setAddOpen(true)}
            open={addOpen}
            trigger={<Button>Add A New Album</Button>}
          >
            <AddAlbumForm 
              onNewAlbum={album => 
                setAlbums(currentAlbums => [album, ...currentAlbums])}/>
          </Modal>

          <Modal
            onClose={() => setAlbumListOpen(false)}
            onOpen={() => setAlbumListOpen(true)}
            open={albumListOpen}
            trigger={<Button>Full Album List</Button>}
          >
            <div class="ui clearing segment">
              <Albums albums={albums} />
            </div>
          </Modal>


      </Container>
  )
}

export default App;
