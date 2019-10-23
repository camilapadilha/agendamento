import React from 'react';


export default () => (
    <>
        <div>
            <nav className="blue darken-4">
                <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Cadastros</a></li>
                        <li><a href="badges.html">Agendamentos</a></li>

                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="slide-out">
                <li><a href="sass.html">Cadastros</a></li>
                <li><a href="badges.html">Agendamentos</a></li>
            </ul>
        </div>
    </>
)