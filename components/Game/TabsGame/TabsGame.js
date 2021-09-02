import React from 'react';
import { Tab } from 'semantic-ui-react';
import InfoGame from '../InfoGame/InfoGame';


export default function TabsGame(props) {
    const { game } = props;

    const panes = [
        {
            menuItem:"Imagenes",
            render: () => (
                <Tab.Pane>
                    <InfoGame game={game} />
                </Tab.Pane>
            )
        }
    ]

    return (
        <>
            <Tab className="tabs-game" panes={panes} />
        </>
    )
}
