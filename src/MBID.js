import { useState, useEffect } from 'react';
import useFetch from './useFetch'

const MBID = (artist, album) => {
    let mbid = ""
    let artist_str = artist.split(' ').join('_')
    let album_str = album.split(' ').join('_')
    const url = `http://musicbrainz.org/ws/2/recording/?query=artist:${artist_str}+release:${album_str}&fmt=json`
    // console.log(url)
    const albumData = useFetch(url)
    if(albumData.recordings !== undefined){
        mbid = albumData.recordings[0].releases[0].id
    }
    
    return mbid
}

export default MBID