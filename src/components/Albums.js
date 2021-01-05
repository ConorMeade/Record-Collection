// rendering albums

import React from 'react';
import { List, Header, Image } from "semantic-ui-react"


export const Albums = ({ albums }) => {
    return (
        <List>
            <h2>Total Albums: {albums.length}</h2>
            <hr />
            {albums.map(album => {
                return (
                    <List.Item key={album.id}>
                        {album.year === 0 ? (
                            <Header>{album.title} by {album.artist} (NA)</Header>
                        ):(
                            <Header>{album.title} by {album.artist} ({album.year})</Header>
                        )}
                    </List.Item>
                )
            })}
        </List>
    )
};