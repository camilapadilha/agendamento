import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import tr from '../list/tr'

export default class Tbody extends Component {
    renderLinhas() {
        for (let l = 1; l <= 7; l++) {
            if (l[0]) {
                document.write(<td>{l}</td>)
            }
            else {
                document.write(<td></td>)
            }
        }
    }

    renderColumns() {
        for (let c = 1; c <= 5; c++) {
            document.write(<tr>{this.renderLinhas()}</tr>)
        }
    }

    render() {
        return (
            <tbody> {this.renderColumns()} </tbody>
        )

    }
}