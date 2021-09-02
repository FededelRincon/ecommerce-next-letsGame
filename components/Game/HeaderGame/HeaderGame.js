import React from 'react'
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { BASE_PATH } from '../../../utils/constants';
import moment from 'moment';
import 'moment/locale/es';

export default function HeaderGame(props) {
    const { game } = props;

    return (
        <>
            <Grid className="header-game">
                <Grid.Column mobile={16} tablet={6} computer={5}>
                    <Image src={`${BASE_PATH}${game.poster.url}`} alt={game.title} fluid/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={10} computer={11}>
                    <Info game={game} />
                </Grid.Column>
            </Grid>
        </>
    )
}


function Info(props) {
    const { game } = props;
    const { title, summary, price, discount,releaseDate } = game;
    return (
        <>
            <div className="header-game__title">
                {title}
                <Icon name="heart outline" link />
            </div>
            <div className="header-game__delivery"> En 48 hs en tu domicilio </div>
            <div className="header-game__summary" dangerouslySetInnerHTML={{__html: summary}} ></div>
            <div className="header-game__release">
                <span>Fecha de lanzamiento:</span>
                     {'  '} 
                <span>{moment(releaseDate).format('LL')}</span> 
            </div>


            
            <div className="header-game__buy">
                <div className="header-game__buy-price">
                    <p>Precio de venta al publico: {price}€ </p>
                    <div className="header-game__buy-price-actions">
                        {(discount!==0) && (<p>-{ discount }% </p>)}
                        <p>{price - Math.floor(price*discount) /100}€</p>
                    </div>
                </div>
                <Button className="header-game__buy-btn">
                    Comprar
                </Button>
            </div>
        </>
    )

}