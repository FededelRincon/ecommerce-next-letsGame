import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import ListGames from '../../components/ListGames';

const limitPerPage = 8;

export default function Platform() {
    const { query } = useRouter();
    const [games, setGames] = useState(null);
    

    useEffect(() => {
        (async () => {
            if (query.platform) {
                const response = await getGamesPlatformApi(query.platform, limitPerPage);
                setGames(response);
            }
        })()
    }, [query]);

    return (
        <>
            <BasicLayout className="platform">
                {!games && <Loader active>Cargando juegos...</Loader>}
                {games && size(games) === 0 && (
                    <div>
                        <h3>No hay juegos disponibles para mostrar</h3>
                    </div>
                )} 
                {size(games)>0 && (
                    <ListGames games={games} />
                )}


            </BasicLayout>
        </>
    )
}
