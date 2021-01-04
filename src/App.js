import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { AddAlbumForm } from "./components/AddAlbumForm"
import { Albums } from "./components/Albums" 
// import AddAlbumForm from './AddAlbumForm'
// import AlbumTable from './AlbumTable'

function App() {
  const [albums, setAlbums] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

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

  const addAlbum = (album) => {
    album.id = albums.length + 1
    // album.mbid = MBID(album.artist, album.album)
    album.mbid = null
    // album.mbid = albums.length + 1
    setAlbums([...albums, album])
  }


  console.log(albums)
  return (
    <Container>
        <p>The current time is {currentTime}.</p>
          <br />
          <AddAlbumForm 
            onNewAlbum={album => 
              setAlbums(currentAlbums => [album, ...currentAlbums])}/>
          <Albums albums={albums}/>
      </Container>
  )
}

export default App;
