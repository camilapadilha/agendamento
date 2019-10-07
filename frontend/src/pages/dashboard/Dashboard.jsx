import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

export default class Dashboard extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('.button-collapse').sideNav();
        });
    }
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Logo</a>
                    <a href="#" data-activates="menu-mobile" class="button-collapse">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="#">Angular</a></li>
                        <li><a href="#">Ionic</a></li>
                        <li><a href="#">TypeScript</a></li>
                        <li><a href="#">Cordova</a></li>
                    </ul>
                    <ul class="side-nav" id="menu-mobile">
                        <li><a href="#">Angular</a></li>
                        <li><a href="#">Ionic</a></li>
                        <li><a href="#">TypeScript</a></li>
                        <li><a href="#">Cordova</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}