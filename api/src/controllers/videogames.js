const { Op } = require("sequelize");
const { Videogames, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

async function getAllVideogames(req, res, next) {
    const { name } = req.query

    let allVideogames = [];
    const pages = [`https://api.rawg.io/api/games?key=${API_KEY}`];
    if (name) {
        let videogamesData = [];

        try {
        const info = await axios.get(
            `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        );
        
        const apiVideogames = info.data.results;

        let apiGames = apiVideogames.map((g) => {
            let videoGame = {
            id: g.id,
            name: g.name,
            description: g.description,
            released: g.released,
            background_image: g.background_image,
            rating: g.rating,
            genres: g.genres.map((e) => e.name),
            platforms: g.platforms.map((e) => e.name),
            };
            return videoGame;
        });
        
        videogamesData = videogamesData.concat(apiGames);

        } catch (error) {
        next(error);
        }

        try {
        const dbVideogames = await Videogames.findAll({
            where: {
            name: { [Op.iLike]: `%${name}%` },
            }, include: {
                model: Genre,
            }
        });

        videogamesData = videogamesData.concat(dbVideogames);

        return res.status(200).json(videogamesData);

        } catch (error) {
        next(error);
        }
    } 

    try {
        for (let i = 0; i < 5; i++) {
        const info = await axios.get(`${pages[i]}`);
        pages.push(info.data.next);

        let gamesFromApi = info.data.results.map((g) => {
            let gameFromApi = {
            id: g.id,
            name: g.name,
            description: g.description,
            released: g.released,
            background_image: g.background_image,
            rating: g.rating,
            genres: g.genres,
            platforms: g.platforms,
            };
            return gameFromApi;
        });

        allVideogames = allVideogames.concat(gamesFromApi);
        }

        const dbVideogames = await Videogames.findAll({
        include: {
            model: Genre,
            }
        });

        allVideogames = allVideogames.concat(dbVideogames);

        res.status(200).json(allVideogames);
    } catch (error) {
        console.log('error de videogames')
        return res.status(400).json("Algo salio mal")
    }
}

module.exports = {
    getAllVideogames,
};