import React from 'react'

export default props => (
    <thead>
        <tr>
            <th></th> 
            <th id="1">Segunda-feira</th>
            <th id="2">Terça-feira</th>
            <th id="3">Quarta-feira</th>
            <th id="4">Quinta-feira</th>
            <th id="5">Sexta-feira</th>
            <th id="6">sábado</th>

        </tr>
        <tr>
            <th>aula</th>
            {props.linha}
        </tr>
    </thead>
)