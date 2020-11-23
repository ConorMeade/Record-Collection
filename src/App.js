import { useState } from 'react';
import './App.css';
import useFetch from './useFetch';
import MBID from './MBID';

function App() {
  const albumData = [
    { id: 1, album: "Kind Of Blue", artist: "Miles Davis"},
    { id: 2, album: "A Love Supreme", artist: "John Coltrane"},
    { id: 3, album: "Person Pitch", artist: "Panda Bear"},
  ]

  // const [albumCount, setAlbumCount] = useState(0);
  let mbids = []
  albumData.map((release) => {
    console.log(MBID(release.artist, release.album))
  })

  console.log(mbids)

  return (
    <div>
      <ul>
        {/* {albumData.map((album) => <li>{album.album} by {album.artist}</li>)} */}
        test

      </ul>
    </div>
  )
}

export default App;
