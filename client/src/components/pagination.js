import React from "react";
import '../estilos/sass/pagination.scss';

export default function Pagination({ allVideogames, videogamesPerPage, pagination}) {
    const pageNumber = []
    const numOfPages = Math.ceil(allVideogames / videogamesPerPage)
    for (let i = 1; i < numOfPages; i++) {
        pageNumber.push(i)
    }
    return (
        <nav className="nav_pagination">
        {pageNumber && pageNumber.map((num) => {
            return <button className="button_pagination" key={num} onClick={() => pagination(num)}>{num}</button>;
        })}
        </nav>
    )
}