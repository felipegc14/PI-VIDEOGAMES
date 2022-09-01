import React from "react";
import '../estilos/sass/card.scss';

export default function Card({ name, background_image, rating, genres, id})  {

    let genre = genres.join(', ');
    

    return (
        <div className="card" key={id}>
            <h3>{name}</h3>
            <img src={background_image} alt={name} className='image' />
            <h5>Rating: {rating}</h5>
            <h5>Genre: {genre}</h5>
        </div>
    );
};