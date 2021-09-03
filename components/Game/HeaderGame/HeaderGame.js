import React, { useEffect, useState } from 'react'
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { BASE_PATH } from '../../../utils/constants';
import moment from 'moment';
import 'moment/locale/es';
import { addFavoriteApi, deleteFavoriteApi, isFavoriteApi } from '../../../api/favorite';
import useAuth from '../../../hooks/useAuth';
import { size } from 'lodash';
import classNames from 'classnames';

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
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth.idUser, game.id, logout);
            if(size(response)>0) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            };
        })()
        setReloadFavorite(false);
    }, [game, reloadFavorite]);

    const addFavorite = async () => {
        if (auth) {
            await addFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorite(true);
        }
    }
    
    const deleteFavorite = async() => {
        if (auth) {
            await deleteFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorite(true);
        }
        
    }

    return (
        <>
            <div className="header-game__title">
                {title}
                {/* <Icon name="heart outline" link /> */}
                <Icon 
                    name={isFavorite ? "heart" :"heart outline"} 
                    className={classNames({
                        like: isFavorite,
                    })} 
                    link 
                    onClick={ isFavorite ? deleteFavorite : addFavorite }
                />
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
                        <p>{ (price - Math.floor(price*discount) /100).toFixed(2) }€</p>
                    </div>
                </div>
                <Button className="header-game__buy-btn">
                    Comprar
                </Button>
            </div>
        </>
    )

}