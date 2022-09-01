import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearDetail } from '../store/actions'
import { useEffect } from "react";
import '../estilos/sass/detail.scss';
import PacmanLoader from "react-spinners/PacmanLoader";
import { BiArrowBack } from "react-icons/bi";
import { MdStar } from "react-icons/md";

export default function GameDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const detail = useSelector((state) => state.videogameDetail)

    useEffect(() => {
        dispatch(getDetails(id))
    },[dispatch, id])

    function handleClick() {
        dispatch(clearDetail())
    }

    return (
        <div className="detailContainer">
            {detail.length === 0 ? (
                <div className="pacLoader">
                <PacmanLoader 
                color="yellow"
                margin={0}
                size={50}/>
                </div>
            ) : (
                <div className="VideogameDetail">
                <h1 className="titleDetail">{detail.name}</h1>
                <h5>{detail.genres}</h5>
                <h5>{detail.platforms}</h5>
                <img src={detail.img} alt="imagen" />
                <h6 className="rating">
                    <MdStar className="mdStar"/> {detail.rating}
                </h6>
                <h6>Release date: {detail.released}</h6>
                <p>Description: {detail.description}</p>
                <Link to="/videogames" className="link">
                    <button className="buttonBackDetail" onClick={(e) => handleClick(e)}><BiArrowBack/>Back</button>
                </Link>
                </div>
            )}
        </div>
    )
}