import { useEffect, useState } from 'react';
import './App.css';
import MBID from './MBID';
import AddAlbumForm from './AddAlbumForm'
import AlbumTable from './AlbumTable'
import useFetch from './useFetch';

function App() {
  const albumData = [
    { id: 1, album: "Kind Of Blue", artist: "Miles Davis", mbid: null},
    { id: 2, album: "A Love Supreme", artist: "John Coltrane", mbid: null},
    { id: 3, album: "Person Pitch", artist: "Panda Bear", mbid: null}
  ]

  const [albumIndex, setAlbumIndex] = useState(0)
  const [albums, setAlbums] = useState(albumData)
  const [albumMbids, setAlbumMbid] = useState([])


  // API call for cover art  
  // https://coverartarchive.org/release/${id}/front


  useEffect(() => {
    albumData.forEach(album => {
      let artist_str = album.artist.split(' ').join('_')
      let album_str = album.album.split(' ').join('_')
      console.log(artist_str)
      console.log(album_str)
      fetch(`http://musicbrainz.org/ws/2/recording/?query=artist:${artist_str}+release:${album_str}&fmt=json`)
        .then(response => {
          if(response.ok){
            // console.log(response.data)
            return response.json();
          }
          throw new Error("error")
        })
        .then(mbid => {
          console.log(mbid.recordings[0].releases[0].id); setAlbumMbid(oldIDs => [...oldIDs, mbid.recordings[0].releases[0].id])
        })
        .catch(() =>
        setAlbumMbid(oldIDs => [...oldIDs, "couldn't find mbid"])
        )
        })
  }, [albums]);
  
  console.log(albumMbids)

  const addAlbum = (album) => {
    album.id = albums.length + 1
    // album.mbid = MBID(album.artist, album.album)
    album.mbid = null
    // album.mbid = albums.length + 1
    setAlbums([...albums, album])
  }

  return (
    <div>
      <ul>
        {/* {albumMbid} */}
        {albumMbids.length}
        <br />
        {albumMbids}
        {/* {albumMbid.map((id) => <li>{id}</li>)} */}
        {/* {mbid} */}
        {/* {idMap} */}
        
        <AlbumTable albums={albums}/>
        <AddAlbumForm addAlbum={addAlbum}/>
      </ul>
    </div>
  )
}

export default App;
