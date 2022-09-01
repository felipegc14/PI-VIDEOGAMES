const { Router } = require('express');
const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env
const router = Router()

router.get('/genres', async(req, res) => {
    try {
        const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const apiResult = apiGenres.data.results
        apiResult && apiResult.map(async (genre) => {
            await Genre.findOrCreate({
                where: { name: genre.name }
            })
        })
        const genres = await Genre.findAll()
        return res.status(200).json(genres)
    } catch (error) {
        console.log(error)
        res.send('No se encontro dicho genero')
    }
})


module.exports = router;