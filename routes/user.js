
const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidate,
    hasRole,
    fieldsValidate
} = require('../middlewares')

const { isValidRol, existsEmail, existsUserById } = require('../helpers/db-validators');

const { usersGet, usersPut, usersPost, usersDelete } = require('../controller/user');

const router = Router();

router.get('/', usersGet)

router.put('/:id', [
    check('id', 'ID invalid').isMongoId().custom(existsUserById),
    check('rol').custom(isValidRol),
    fieldsValidate
], usersPut)

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail().custom(existsEmail),
    check('password', 'password is required').isLength({ min: 6 }),
    // check('rol', 'rol is required').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isValidRol),
    fieldsValidate
], usersPost)

router.delete('/:id', [
    jwtValidate,
    // isAdminRole,
    hasRole('USER_ROLE'),
    check('id', 'ID invalid').isMongoId().custom(existsUserById),
    fieldsValidate
], usersDelete)

module.exports = router