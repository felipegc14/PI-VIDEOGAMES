import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_DETAILS = "GET_DETAILS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const SORT_BY_ALPHA = "SORT_BY_ALPHA";
export const CLEAR_DETAIL = "CLEAR_DETAIL"; 

export const getVideogames = () => {
    return async(dispatch) => {
        return await axios.get('http://localhost:3001/videogames')
        .then(res => dispatch({type: GET_VIDEOGAMES, payload: res.data}))
    }
};

export const getGenres = () => {
    return async(dispatch) => {
        return await axios.get('http://localhost:3001/genres')
        .then(res => dispatch({type: GET_GENRES, payload: res.data}))
    }
};

export const getDetails = (id) => {
    return async(dispatch) => {
        try {
            return await axios.get(`http://localhost:3001/videogame/${id}`)
            .then(res => dispatch({type: GET_DETAILS, payload: res.data}))
        } catch (error) {
            console.log(error)
        }
    }
};

export const searchByName = (name) => {
    return async(dispatch) => {
        try {
            return await axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => dispatch({type: SEARCH_BY_NAME, payload: res.data}))
        } catch (error) {
            console.log(error)
        }
    }
};

export const createVideogame = (payload) => {
    return async(dispatch) => {
        const create = await axios.post('http://localhost:3001/videogame', payload)
        console.log("info create: ", create)
        return dispatch({
            type: CREATE_VIDEOGAME, create
        })
    }
};

export const filterByCreation = (payload) => { 
    return {
        type: FILTER_BY_CREATION,
        payload
    }
};

export const filterByGenre = (payload) => { 
    return {
        type: FILTER_BY_GENRE,
        payload
    }
};

export const sortByRating = (payload) => { 
    return {
        type: SORT_BY_RATING,
        payload
    }
};

export const sortByAlpha = (payload) => { 
    return {
        type: SORT_BY_ALPHA,
        payload
    }
};

export const clearDetail = (payload) => { 
    return {
        type: CLEAR_DETAIL,
        payload
    }
};