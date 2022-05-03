
const { Router } = require('express');
const { check } = require('express-validator');
const { login, google } = require('../controller/auth');
const { fieldsValidate } = require('../middlewares/field-validate');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidate
], login)

router.post('/google', [
    check('id_token', 'ID Token is required'),
    fieldsValidate
], google)


module.exports = router