import React, { useEffect, useState } from 'react';
import BasicLayout from "../layouts/BasicLayout/";
import { getLastGamesApi } from '../api/game';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import ListGames from '../components/ListGames';

export default function Home() {
    const [games, setGames] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getLastGamesApi(50);
            if ( size(response) > 0 ) {
                setGames(response);
            }else {
                setGames([]);
            }


        })();
    }, []);

    return (
        <>
            <div className="home">
                <BasicLayout>
                    { !games && <Loader active>Cargando Juegos</Loader> }
                    { games && size(games) === 0 && (
                        <div>
                            <h3>No hay juegos</h3>
                        </div>
                    )}
                    {size(games)>0 && <ListGames games={games} /> }
                </BasicLayout>
            </div>
        </>
    )
}
