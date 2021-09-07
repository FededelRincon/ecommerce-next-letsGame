import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import { searchGamesApi } from '../api/game';
import ListGames from '../components/ListGames';
import Seo from '../components/Seo';


export default function search() {
    const [games, setGames] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById('search-game').focus();
    }, []);

    useEffect(() => {
        (async () => {
            if (size(query.query)>0 ) {
                const response = await searchGamesApi(query.query);
                if (size(response)>0) {
                    setGames(response);
                } else {
                    setGames([]);
                }
            } else {
                setGames([]);
            }
            
        })();
    }, [query]);

    return (
        <>
            <BasicLayout className="search">
                <Seo
                    title={`Buscando: ${query.query}`}
                />
                {!games && <Loader active>Buscando Juegos</Loader>}
                {games && size(games) === 0 && (
                    <div>
                        <h3>No se han encontrado juegos con esa busqueda</h3>
                    </div>
                )}
                {size(games)>0 && <ListGames games={games} />}
            </BasicLayout>
        </>
    );
};




