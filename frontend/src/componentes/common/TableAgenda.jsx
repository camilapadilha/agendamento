import React from 'react';
import Thead from './Thead';
import Tbody from './Tbody';

export default props => (
    <table className="centered tableAgenda">
        <Thead linha={props.renderLinha} />
        <Tbody horariosAgendados={props.horariosAgendados}
            linhas={props.renderLinha} />
    </table>
)