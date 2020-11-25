import { useState } from 'react';
import './App.css';
import MBID from './MBID';
import AddAlbumForm from './AddAlbumForm'
import AlbumTable from './AlbumTable'

function App() {
  const albumData = [
    { id: 1, album: "Kind Of Blue", artist: "Miles Davis", mbid: 1},
    { id: 2, album: "A Love Supreme", artist: "John Coltrane", mbid: 2},
    { id: 3, album: "Person Pitch", artist: "Panda Bear", mbid: 3},
  ]


  const [albums, setAlbums] = useState(albumData)

  console.log(albums)
  // albumData.forEach(release => release.mbid = MBID(release.artist, release.album))
  // API call for cover art  
  // https://coverartarchive.org/release/${id}/front

  const addAlbum = (album) => {
    album.id = albums.length + 1
    // album.mbid = MBID(album.artist, album.album)
    album.mbid = albums.length + 1
    setAlbums([...albums, album])
  }

  return (
    <div>
      <ul>
        {/* {albumData.map((album) => <li>{album.album} by {album.artist}</li>)} */}
        <AlbumTable albums={albums}/>
        <AddAlbumForm addAlbum={addAlbum}/>
      </ul>
    </div>
  )
}

export default App;
