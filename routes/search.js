
const { Router } = require('express');
const { search } = require('../controller/search');


const router = Router();

router.get('/:colection/:termino', search)


module.exports = router