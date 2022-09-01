import {
    GET_VIDEOGAMES,
    GET_GENRES,
    GET_DETAILS,
    SEARCH_BY_NAME,
    CREATE_VIDEOGAME,
    FILTER_BY_CREATION,
    FILTER_BY_GENRE,
    SORT_BY_RATING,
    SORT_BY_ALPHA,
    CLEAR_DETAIL
} from '../actions'

const initialState = {
    videogames: [],
    genres: [],
    videogameDetail: [],
    videogamesFilter: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:
    case GET_VIDEOGAMES: 
    return{
        ...state,
        videogames: action.payload,
        videogamesFilter: action.payload
    }
    case GET_GENRES: 
    return{
        ...state,
        genres: action.payload 
    }
    case GET_DETAILS: 
    return{
        ...state,
        videogameDetail: action.payload
    }
    case SEARCH_BY_NAME: 
    return{
        ...state,
        videogames: action.payload
    }
    case CREATE_VIDEOGAME: 
    return{
        ...state,
    }
    case FILTER_BY_CREATION: 
    const filteredByCreatyion =
        action.payload === 'all'
        ? state.videogamesFilter
        : action.payload === 'db'
        ? state.videogamesFilter.filter(
            (v) => v.id.toString().length > 10
            )
        : state.videogamesFilter.filter(
            (v) => v.id.toString().length < 10
            );
    return {
        ...state,
        videogames: filteredByCreatyion,
    };
    case FILTER_BY_GENRE: 
    const videogames = state.videogamesFilter
    const filteredByGenre = 
    action.payload === 'genre'
            ? videogames
            : videogames.filter((v) => 
            {
                for(let i=0; i < v.genres.length; i++){
                if(v.genres[i].name === action.payload) return true
                }
                return undefined
            })
    return{
        ...state,
        videogames: filteredByGenre
    };
    case SORT_BY_RATING: 
        let sortRating =
        action.payload === 'ascending'
            ? state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return 1;
                if (a.rating < b.rating) return -1;
                else return 0;
                })
            : state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                else return 0;
                })

        return {
        ...state,
        videogames: sortRating,
    }
    case SORT_BY_ALPHA: 
        let sortAlpha =
        action.payload === 'ascending'
            ? state.videogames.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                else return 0;
                })
            : state.videogames.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                else return 0;
                })

        return {
        ...state,
        videogames: sortAlpha,
    
    }
    case CLEAR_DETAIL: 
    return{
        ...state,
        videogameDetail: []
    }
    default: return state
    }
};

export default rootReducer;