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

        const [errors, setErrors] = useState({})


        /* function handleDeleteGenre(e) {
            setInput({
                ...input,
                genres: input.genres.filter(g => g !== e)
            })
        } */

        function handleInputChange(e) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        } 
        
        function handleSelectGenre(e) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
            }))
        }
    
        function handleSelectPlatform(e) {
            setInput({
                ...input,
                platforms: input.platforms.includes(e.target.value) ?
                    [...input.platforms] :
                    [...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }

        function handleDelete(e) {
            setInput({
                ...input,
                platforms: input.platforms.filter(p => p !== e)
            })
        }

        function handleDeleteGenre(e) {
            setInput({
                ...input,
                genres: input.genres.filter(g => g !== e)
            })
        }
    
        function handleSubmit(e) {
        e.preventDefault();
        if (!input.platforms) {
            alert('A platform is required!')
            return
        } else if (!input.genres) {
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
            platforms: [],
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
            <div className='labelInput'>
                <label className="FormName">Name </label>
                <input
                className="inputName"
                type="text"
                //onChange={(e) => handleChange(e)}
                onChange={(e) => handleInputChange(e)}
                value={input.name}
                name="name"
                />
                {/* {errors.name && <span>{errors.name}</span> } */}
            </div>
            {errors.name && <span>{errors.name}</span> }
            <div className='labelInput'>
                <label className="formDescription">Description </label>
                <input
                className="InputDescription"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={input.description}
                name="description"
                />
                {/* {errors.description && <span>{errors.description}</span> } */}
            </div>
            {errors.description && <span>{errors.description}</span> }
            <div className='labelInput'> 
                <label className="ReleasedForm">Released date </label>
                <input
                className="InputRealesed"
                type="date"
                onChange={(e) => handleInputChange(e)}
                value={input.released}
                name="released"
                />
            </div>
            <div className='labelInput'> 
                <label className="RatingForm">Rating </label>
                <input
                className="InputRating"
                type="number"
                onChange={(e) => handleInputChange(e)}
                value={input.rating}
                min="1"
                max="5"
                name="rating"  
                />
                {/* {errors.rating && <span>{errors.rating}</span> } */}
            </div>
            {errors.rating && <span>{errors.rating}</span> }
            <div className='labelInput'>
                <label className="ImageForm">Image </label>
                <input
                className="InputImage"
                type="text"
                placeholder="Image URL... "
                onChange={(e) => handleInputChange(e)}
                value={input.background_image}
                name="background_image"
                />
            </div>

                <div className='selectors'>
                <select name="platform" onChange={(e) => handleSelectPlatform(e)}>
                <option value="">Select Platforms</option>
                {allplatforms.map
                ((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
                </select>
                {errors.plarform && <span>{errors.platform}</span> }

                <select name="genre" onChange={(e) => handleSelectGenre(e)}>
                <option value="All">Select Genres</option>
                {genres.map((g) => (
                    <option key={g.id} value={g.name}>{g.name}</option>
                ))}
                </select>
                {errors.genre && <span>{errors.genre}</span> }
                </div>
                <div className="button_create">
                    <button className='submit' type="submit">
                    Create Game
                    </button>
                </div>
            </div>
            <div className='lists'>
                <div className='platformsList'>
                <h2>Platforms selected: </h2>
                    {input.platforms && input.platforms.map((p) => {
                                return (
                                    <div className='platforms_container' key={p}>
                                        <h5 className='namePlatform'>{p}</h5>
                                        <button className='buttonPlatform' value={p} onClick={() => handleDelete(p)}>x</button>
                                    </div>
                                )
                            })}
                
                </div>
                <div className='genresList'>
                <h2>Genres Selected: </h2>
                    {input.genres && input.genres.map((g) => {
                                return (
                                    <div className='genres_container' key={g}>
                                        <h5 className='nameGenre'>{g}</h5>
                                        <button className='buttonGenre' value={g} onClick={() => handleDeleteGenre(g)}>x</button>
                                    </div>
                                )
                            })}
                </div>
            </div>    
            </form>
        </div>
        );
    }

    export function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = 'Name is required';
            } else if (input.name.length < 2) {
            errors.name = 'Name is invalid, should contain at least 2 characters';
            }
        if (!input.description) {
            errors.description = 'Description is required';
            } else if (input.description.length < 20) {
            errors.description = 'Description should contain more than 20 characters';
        }
        if (!input.rating) {
            errors.rating = 'Rating is required';
            } else if (input.rating < 0 || input.rating > 5) {
            errors.rating = 'Rating is invalid, should be between 0 and 5';
        }
        if (!input.genre) {
            errors.genres = 'Genre is required';
            } 
        if (!input.platforms) {
            errors.platforms = 'Platform is required';
            } 
        return errors;
    }