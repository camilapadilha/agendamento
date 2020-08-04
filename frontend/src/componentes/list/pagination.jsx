import React, { useState } from 'react';
import './list.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = totalPosts / postsPerPage == 0 ? [1] : [];
    const [page, setPage] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    function btnPaginate(number) {
        document.getElementById(page).setAttribute('class', '');
        paginate(number);
        setPage(number);
        pageActive(number);
    }

    function pageAnterior() {
        if (page > 1) {
            document.getElementById(page).setAttribute('class', '');
            paginate(page - 1)
            setPage(page - 1)
            pageActive(page - 1);
        }
    }

    function pageProximo() {
        if (page < pageNumbers.length) {
            document.getElementById(page).setAttribute('class', '');
            paginate(page + 1)
            setPage(page + 1)
            pageActive(page + 1);
        }
    }

    function pageActive(number) {
        document.getElementById(number).setAttribute('class', 'active');
    }

    return (
        <ul className='pagination'>
            <li className=""><a onClick={() => pageAnterior()
            } href="#!"><i className="material-icons">chevron_left</i></a></li>
            {pageNumbers.map(number => (
                <li key={number} className={number == 1 ? 'active' : ''} id={number}>
                    <a onClick={() =>
                        btnPaginate(number)
                    }
                        href='#!'>
                        {number}
                    </a>
                </li>
            ))
            }
            <li className=""><a onClick={() => pageProximo()} href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
    );
};

export default Pagination;