import React, { Component } from 'react'
import tr from '../list/tr'

export default class Tbody extends Component {
    renderColumns() {
        for (const c = 1; c <= 5; c++) {
            document.write('<tr>');
            for (const l = 1; l <= 7; l++) {
                if (l[0]) {
                    <td>{l}</td>
                }
                else {
                    <td></td>
                }
            }
            document.write('</tr>');
        }
    }

    render() {
        return (
            <tbody> {renderColumns} </tbody>
        )

    }
}