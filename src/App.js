import { useEffect, useState } from 'react';
import './App.css';
import { Albums } from "./components/Albums" 
// import AddAlbumForm from './AddAlbumForm'
// import AlbumTable from './AlbumTable'

function App() {
  const albumData = [
    { id: 1, album: "Kind Of Blue", artist: "Miles Davis", mbid: null},
    { id: 2, album: "A Love Supreme", artist: "John Coltrane", mbid: null},
    { id: 3, album: "Person Pitch", artist: "Panda Bear", mbid: null}
  ]

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
    <div>
      <p>The current time is {currentTime}.</p>
      <ul>
        <br />
        <Albums albums={albums}/>
        {/* {albums} */}
        {/* <AlbumTable albums={albums}/> */}
        {/* <AddAlbumForm addAlbum={addAlbum}/> */}
      </ul>
    </div>
  )
}

export default App;
