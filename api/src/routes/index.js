const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const VideogamesById = require('./videogameById')
const Videogames = require('./videogames');
const CreateVideogame = require('./createVideogame');
const Genres = require('./genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', VideogamesById)
router.use('/', Videogames)
router.use('/', CreateVideogame)
router.use('/', Genres)



module.exports = router;
