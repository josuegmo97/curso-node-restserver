
const { Router } = require('express');
const { check } = require('express-validator');
const { categoryPost, categorysGet, categoryGet, categoryPut, categoryDelete } = require('../controller/category');

const { jwtValidate, hasRole, fieldsValidate } = require('../middlewares')

const { existsCategoryById } = require('../helpers/db-validators');

const router = Router();

// Todas las categorias - publico
router.get('/', categorysGet)

// Obtener una catgoria por id - publico
router.get('/:id',[
    check('id', 'ID invalid').isMongoId().custom(existsCategoryById),
    fieldsValidate
], categoryGet)

// Crear categoria - privado - cualquier persona con un token válido
router.post('/',[
    jwtValidate,
    check('name', 'The name is required').not().isEmpty(),
    fieldsValidate
], categoryPost)

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    jwtValidate,
    check('id', 'ID invalid').isMongoId().custom(existsCategoryById),
    check('name', 'The name is required').not().isEmpty(),
    fieldsValidate
], categoryPut)

// Borrar - admin
router.delete('/:id', [
    check('id', 'ID invalid').isMongoId().custom(existsCategoryById),
    fieldsValidate
], categoryDelete)


module.exports = router