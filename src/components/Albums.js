// rendering albums

import React from 'react';
import { List, Header, Image } from "semantic-ui-react"


export const Albums = ({ albums }) => {
    return (
        <List>
            {albums.map(album => {
                return (
                    <List.Item key={album.id}>
                        <Header>{album.title} by {album.artist}</Header>
                        <Image src={album.cover}/>
                    </List.Item>
                )
            })}
        </List>
    )
};