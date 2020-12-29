import { useEffect, useState } from 'react';
import './App.css';
import AddAlbumForm from './AddAlbumForm'
import AlbumTable from './AlbumTable'

function App() {
  const albumData = [
    { id: 1, album: "Kind Of Blue", artist: "Miles Davis", mbid: null},
    { id: 2, album: "A Love Supreme", artist: "John Coltrane", mbid: null},
    { id: 3, album: "Person Pitch", artist: "Panda Bear", mbid: null}
  ]

  const [albums, setAlbums] = useState(albumData);
  const [albumMbids, setAlbumMbid] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time)
    })
  }, [])


  useEffect(() => {
    fetch('/albums').then(response => response.json).then(data => {
      console.log("albums: ", data)
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

  return (
    <div>
      <p>The current time is {currentTime}.</p>
      <ul>
        <br />
        {albumMbids}
        
        <AlbumTable albums={albums}/>
        <AddAlbumForm addAlbum={addAlbum}/>
      </ul>
    </div>
  )
}

export default App;
