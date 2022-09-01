import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createVideogame, getGenres } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import '../estilos/sass/createGame.scss';

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const history = useHistory()
    
        let allplatforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        " SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
        ];
    
        const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
        });
    
        function handleChange(e) {
        //e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(input);
        }
    
        function platformHandler(e) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
            });
        }
        
        function genreHandler(e) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            });
        }
    
        function handleSubmit(e) {
        // ver porque carajos no se actualiza los checks
        e.preventDefault();
        if (!input.name) {
            alert('A name is required!')
        } else if (!input.description) {
            alert('A description is required!')
        } else if (!input.released) {
            return alert("Released date is required!")
        } else if (!input.rating) {
            return input.rating = 0
        } else if (!input.platforms || input.platforms[0] === '') {
            alert('A platform is required!')
            return
        } else if (!input.genres || input.genres.length === 0) {
            return alert("A genre is required!");
        } else {
            console.log(input);
            dispatch(createVideogame(input));
            alert("Videogame created!");
            setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            background_image: "",
            plataforms: [],
            genres: [],
            });
            document.getElementById("form").reset();
            history.push('/videogames')
        }
        }
    
        useEffect(() => {
        dispatch(getGenres());
        }, [dispatch]);
    
        return (
        <div className="container_form">
            <div>
            <Link className="buttonBack" to="/videogames">
                <button className="button">◀ Back</button>
            </Link>
            </div>
    
            <h1 className="title">Create your game!</h1>
    
            <form id="form" className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="SubContainer-Form">
                <label className="FormName">Name </label>
                <input
                className="inputName"
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.name}
                name="name"
                />

                <label className="formDescription">Description </label>
                <input
                className="InputDescription"
                type="text"
                onChange={(e) => handleChange(e)}
                value={input.description}
                name="description"
                />

                <label className="ReleasedForm">Released date </label>
                <input
                className="InputRealesed"
                type="date"
                onChange={(e) => handleChange(e)}
                value={input.released}
                name="released"
                />

                <label className="RatingForm">Rating </label>
                <input
                className="InputRating"
                type="number"
                onChange={(e) => handleChange(e)}
                value={input.rating}
                min="1"
                max="5"
                name="rating"
                />

                <label className="ImageForm">Image </label>
                <input
                className="InputImage"
                type="text"
                placeholder="Image URL... "
                onChange={(e) => handleChange(e)}
                value={input.background_image}
                name="background_image"
                />

                <div className='selectors'>
                <select name="platform" onChange={(event) => platformHandler(event)}>
                <option value="">Select Platforms</option>
                {allplatforms.map
                ((p) => (
                    <option key={p} value={p} type="checkbox">{p}</option>
                ))}
                </select>

                <select name="genre" onChange={(event) => genreHandler(event)}>
                <option value="All">Select Genres</option>
                {genres.map((g) => (
                    <option key={g.id} value={g.name} type="checkbox">{g.name}</option>
                ))}
                </select>
                </div>
            </div>
                <div className="button_create">
                    <button className='submit' type="submit">
                    Create Game
                    </button>
                </div>
            </form>
        </div>
        );
    }