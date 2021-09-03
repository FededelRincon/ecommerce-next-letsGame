import React from 'react';
import ReactPlayer from 'react-player/lazy';
import CarouselScreenshots from '../CarouselScreenshots';


export default function InfoGame(props) {
    const { game } = props;

    return (
        <>
            <div className="info-game">
                <CarouselScreenshots 
                    title={game.title}
                    screenshots={game.screenshots}
                />

                <p>Activar videos en infoGame.js</p>
                {/* <ReactPlayer 
                    className="info-game__video" 
                    url={game.video} 
                    controls={true} 
                /> */}
            </div>
        </>
    )
}
