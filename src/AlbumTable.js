import React from 'react'

const AlbumTable = (props) => (
    <table>
        <thead>
            <tr>
                <th>Album</th>
                <th>Artist</th>
                <th>Musicbrainz ID</th>
            </tr>
        </thead>
        <tbody>
            {props.albums.length > 0 ? (
                props.albums.map((release) => (
                    <tr key ={release.id}>
                        <td>{release.album}</td>
                        <td>{release.artist}</td>
                        <td>{release.mbid}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No Data</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default AlbumTable