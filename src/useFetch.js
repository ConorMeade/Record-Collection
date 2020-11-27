import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [jsonAlbumData, setJsonAlbumData] = useState({})

    useEffect(() => {
        if(!url) return
        fetch(url)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error('error');
            })
            .then(data => setJsonAlbumData(data))
            .catch(() =>
            setJsonAlbumData({ error : "oops, something went wrong when fetching the data"})
            );
        }, [url]);

    return jsonAlbumData

}


export default useFetch