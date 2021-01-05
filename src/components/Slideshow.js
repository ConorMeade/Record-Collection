import React from 'react';
import { Slide, Fade, Zoom } from 'react-slideshow-image';
import './Slideshow.css'
import 'react-slideshow-image/dist/styles.css';
import { Albums } from './Albums';



export const Slideshow = ({ albums }) => {
    return (
        <div className='slide-container'>
            <Slide>
                {albums.map(album => {
                    return (
                        <div className="each-slide">
                            <div>
                                <img src={album.cover} alt={'public.pnggrad16rgb.png'}/>
                            </div>
                            <h2 className="text">{album.title} by {album.artist}</h2>
                        </div>
                    )
                })}
            </Slide>
        </div>
    )
}