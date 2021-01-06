import React from 'react';
import { Slide, Fade, Zoom } from 'react-slideshow-image';
import './Slideshow.css'
import 'react-slideshow-image/dist/styles.css';



export const Slideshow = ({ albums }) => {
    return (
        <div className='slide-container'>
            <Slide>
                {albums.map(album => {
                    return (
                        <div className="each-slide">
                            <div>
                                <img src={album.cover} alt={'public/pnggrad16rgb.png'}/>
                            </div>
                            {album.year === 0 ? (
                                <>
                                    <h2 className="text">{album.title} by {album.artist}</h2>
                                    <h4 className="text">Genre: {album.genre}, Added on: {album.date_added}</h4>
                                </>
                                ) : (
                                <>
                                    <h2 className="text">{album.title} by {album.artist} ({album.year})</h2>
                                    <h3 className="text">Genre: {album.genre}, Added on: {album.date_added}</h3>
                                </>
                            )
                            }
                        </div>
                    )
                })}
            </Slide>
        </div>
    )
}