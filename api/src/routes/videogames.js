const { Router } = require('express');
const { getAllVideogames } = require("../controllers/videogames");

const router = Router()

router.get('/videogames', getAllVideogames);

module.exports = router;