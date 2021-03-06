import React, { useEffect, useState } from 'react';
import { getFavoriteApi } from '../api/favorite';
import BasicLayout from '../layouts/BasicLayout';
import { size, forEach } from 'lodash'
import useAuth from '../hooks/useAuth';
import ListGames from '../components/ListGames';
import { Loader } from 'semantic-ui-react';
import Seo from '../components/Seo';


export default function wishlist() {
    const [games, setGames] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavoriteApi(auth.idUser, logout)
            if (size(response)>0) {
                const gamesList = []
                forEach(response, (data) => {
                    gamesList.push(data.game)
                });
                setGames(gamesList);
            } else {
                setGames([]);
            }

        })();
    }, []);

    return (
        <>
            <BasicLayout className="wishlist">
                <Seo title={'Lets Game - Wishlist'} />

                <div className="wishlist__block">
                    <div className="title"> Lista de deseos </div>

                    <div className="data">
                        {!games && <Loader active>Cargando juegos...</Loader>}

                        {games && size(games) === 0 && (
                            <div>
                                <h3 className="data__not-found">No tienes ningun juego en tu wishlist</h3>
                            </div>
                        )} 

                        {size(games)>0 && (
                            <ListGames games={games} />
                        )}
                    </div>
                </div>
            </BasicLayout>
        </>
    )
}
