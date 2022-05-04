
const { Router } = require('express');
const { check } = require('express-validator');
const { productPost, productsGet, productGet, productPut, productDelete } = require('../controller/product');

const { jwtValidate, hasRole, fieldsValidate } = require('../middlewares')

const { existsProductById } = require('../helpers/db-validators');

const router = Router();

// Todas las products - publico
router.get('/', productsGet)

// Obtener un product por id - publico
router.get('/:id',[
    check('id', 'ID invalid').isMongoId().custom(existsProductById),
    fieldsValidate
], productGet)

// Crear product - privado - cualquier persona con un token válido
router.post('/',[
    jwtValidate,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'ID invalid').isMongoId().custom(existsProductById),
    check('price', 'The price is not number').isNumeric(),
    fieldsValidate
], productPost)

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    jwtValidate,
    check('id', 'ID invalid').isMongoId().custom(existsProductById),
    check('name', 'The name is required').not().isEmpty(),
    fieldsValidate
], productPut)

// Borrar - admin
router.delete('/:id', [
    check('id', 'ID invalid').isMongoId().custom(existsProductById),
    fieldsValidate
], productDelete)


module.exports = router