//import { Link } from 'react-router-dom';
import React from "react";
import '../estilos/sass/home.scss';
import { BiJoystick } from "react-icons/bi";
import SearchBar from './searchBar';
import Pagination from "./pagination";
import { useDispatch, useSelector } from 'react-redux'
import Card from './card';
import { Link } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";
import {
    filterByCreation,
    filterByGenre,
    sortByRating,
    sortByAlpha,
    getVideogames,
    getGenres
} from '../store/actions'
import { useState, useEffect } from "react";

export default function Home() {
    const dispatch = useDispatch();

    const allGenres = useSelector((state) => state.genres);
    const allVideogames = useSelector((state) => state.videogames);
    const [page, setPage] = useState(1);
    const [order, serOrder] = useState('');
    const videogamesPerPage = 15;
    const lastVideogamePerPage = page * videogamesPerPage;
    const firstVideogamePerPage = lastVideogamePerPage - videogamesPerPage;
    const currentPageVideogames = allVideogames.slice(firstVideogamePerPage, lastVideogamePerPage)

    
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    function pagination(num){
        setPage(num)
    }

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }  

    function filterByCreationHandler(e){
        dispatch(filterByCreation(e.target.value))
        setPage(1)
    }

    function filterByGenreHandler(e){
        dispatch(filterByGenre(e.target.value))
    }

    function sortByRatingHandler(e){
        e.preventDefault()
        dispatch(sortByRating(e.target.value))
        setPage(1)
        serOrder(e.target.value)
    }

    function sortByAlphaHandler(e){
        e.preventDefault()
        dispatch(sortByAlpha(e.target.value))
        setPage(1)
        serOrder(e.target.value)
    }

    return (
        <div className='app'>
        {/* { loading ? <PacmanLoader /> : */}
        { allVideogames.length === 0 ? (
            <div className="pacLoader">
            <PacmanLoader 
            className="pacman"
            color="yellow"
            margin={0}
            size={50}/>
            </div>
        ) : (
            <div className='home_container'>
            <div className="sub_container">
                <h1 className='titleHome'><BiJoystick className='joystick'/>Henry Videogame App</h1>
                <div className="container_buttons">
                <div className="search_bar" id="searchbar">
                    <SearchBar/>
                </div>
                <button className="refresh" onClick={(e) => handleClick(e)}>
                    Show Games
                </button>
                <button className="create">
                <Link className="createLink" to="/create">
                    Create Game
                </Link>
                </button>
                </div>
                <div className='filters'>
                    <select className="selector" onChange={(e) => sortByRatingHandler(e)}>
                        <option value="rating">Sort By Rating</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <select className="selector" onChange={(e) => sortByAlphaHandler(e)}>
                        <option value="alpha">Sort By Alphabet</option>
                        <option value="ascending">A-Z</option>
                        <option value="descending">Z-A</option>
                    </select>
                    <select className="selector" onChange={(e) => filterByGenreHandler(e)}>
                        <option value="genre">Genres</option>
                        {allGenres && allGenres.map((g) => {
                            return <option value={g.name} key={g.id}>{g.name}</option>
                        })}
                    </select>
                    <select className="selector" onChange={(e) => filterByCreationHandler(e)}>
                        <option value="all">Videogames</option>
                        <option value="db">Created</option>
                        <option value="api">Existing</option>
                    </select>
                </div>
                <div className="pagination">
                    <Pagination 
                        allVideogames={allVideogames.length}
                        videogamesPerPage={videogamesPerPage}
                        pagination={pagination}
                        page={page}
                    />
                </div>
                <div className="card_container">
                    {currentPageVideogames && currentPageVideogames.map((v) => {
                        return (
                            <section className="card_home" key={v.id}>
                            <Link to={`/videogame/${v.id}`} className="linkDetail"> 
                                <Card
                                name={v.name}
                                background_image={v.background_image}
                                genres={v.genres.map(g => g.name)}
                                rating={v.rating}
                                key={v.id}
                                /> 
                            </Link>
                            </section>
                    )})
                    }
                </div>
                {/* <div className="pagination">
                    <Pagination 
                        allVideogames={allVideogames.length}
                        videogamesPerPage={videogamesPerPage}
                        page={page}
                        pagination={pagination}
                    />
                </div> */}
                </div>
                </div>
        )}
        </div>
    )
}