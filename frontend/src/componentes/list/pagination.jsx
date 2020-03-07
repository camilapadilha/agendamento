import React, { useState } from 'react';
import './list.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];
    const [page, setPage] = useState();

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='pagination'>
            {/* <li class="disabled"><a onClick={() => console.log("me", pageNumbers)} href="#!"><i class="material-icons">chevron_left</i></a></li> */}
            {pageNumbers.map(number => (
                <li key={number} className=''>
                    <a onClick={() => paginate(number)} href='#!'>
                        {number}
                    </a>
                </li>
            ))}
            {/* <li classs="waves-effect"><a onClick={() => console.log("ma", pageNumbers)} href="#!"><i class="material-icons">chevron_right</i></a></li> */}
        </ul>
    );
};

export default Pagination;