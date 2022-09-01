const { Router } = require('express');
//const { url } = require('../url/url');
const { Genre, Videogames } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env

const router = Router()

router.get('/videogame/:id', async(req, res) => {
    const { id } = req.params
    const uuidValidator = id.includes('-');
    if (uuidValidator) {
    try {
        const gameById = await Videogames.findByPk(id, { include: Genre })
        res.send(gameById)
    } catch (error) {
        console.log(error)
        res.send('No se encontro dicho videojuego')
    }
    } else {
        try {
            const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let data = api.data;
            let game = {
                id: data.id,
                name: data.name,
                img: data.background_image,
                rating: data.rating,
                released: data.released,
                description: data.description,
                platforms: data.platforms.map((p) => p.platform.name).join(', '),
                genres: data.genres.map((g) => g.name).join(', '),
            }
            return res.status(200).json(game);
        } catch (error) {
            console.log(error)
            return res.status(404).json('error de id');
        }
    }
})


module.exports = router;