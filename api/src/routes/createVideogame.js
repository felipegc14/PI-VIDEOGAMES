const { Router } = require('express');
const { Genre, Videogames } = require("../db");

const router = Router()

router.post('/videogame', async(req, res) => {
    const { name, description, released, rating, platforms, genres,background_image } = req.body;
    if(!name || !description || !platforms) return res.status(404).send('Falta enviar datos')
    try {
        const newVideogame = await Videogames.create({
            name, 
            description, 
            released, 
            rating, 
            platforms,
            background_image 
        })
        const findGenre = await Genre.findAll({    
            where: {name: genres}
        }) 
        await newVideogame.addGenre(findGenre)
        console.log(newVideogame)
        res.status(200).send('Se creo el videojuego')
    } catch (error) {
        console.log(error)
        res.status(400).send('No se pudo crear el videojuego')
    }
})
/*{
    "name":"felipe",
    "description":"felipe gomez castro",
    "rating":4,
    "platforms":"sega",
    "genres":"action",
    "background_image":"jfefe.jpg"
}*/


module.exports = router;