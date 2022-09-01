import React from "react";
import '../estilos/sass/searchbar.scss';
import { BsSearch } from "react-icons/bs";
import { searchByName } from '../store/actions'
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        if (!name) {
            return alert('Please enter a name')
        }
        dispatch(searchByName(name))
        setName('')
    } 

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    } 
    return (
        <div className='container'>
            <form action="" className='search_bar' onChange={handleChange}>
                <input className="inputSearch" type="text" placeholder='Search Videogames'/>
                <button type='submit' onClick={handleSubmit} className="submit"><BsSearch/></button>
            </form>
        </div>
    )
}