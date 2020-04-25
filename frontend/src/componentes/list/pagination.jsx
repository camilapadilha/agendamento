import React, { useState } from 'react';
import './list.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = totalPosts / postsPerPage==0 ? [1] : [];
    const [page, setPage] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    function btnPaginate(number) {
        paginate(number);
        setPage(number);
    }

    function pageAnterior() {
        if (page > 1) {
            paginate(page - 1)
            setPage(page - 1)
        }
    }
    
    function pageProximo() {
        if (page < pageNumbers.length) {
            paginate(page + 1)
            setPage(page + 1)
        }
    }

    return (
        <ul className='pagination'>
            <li className="waves-effect lighten-5"><a onClick={() => pageAnterior()
            } href="#!"><i className="material-icons">chevron_left</i></a></li>
            {pageNumbers.map(number => (
                <li key={number} className=''>
                    <a onClick={() =>
                        btnPaginate(number)
                    }
                        href='#!'>
                        {number}
                    </a>
                </li>
            ))
            }
            <li className="waves-effect lighten-5"><a onClick={() => pageProximo()} href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul >
    );
};

export default Pagination;