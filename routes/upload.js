
const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImg, showImg, updateImgCloudinary } = require('../controller/upload');
const { colectionsAllows } = require('../helpers');
const { fieldsValidate } = require('../middlewares/field-validate');

const router = Router();

router.post('/', uploadFile)

router.put('/:colection/:id',[
    check('id', 'ID is required by mongo').isMongoId(),
    check('colection').custom( c => colectionsAllows(c, ['users', 'products'])),
    fieldsValidate
], updateImgCloudinary)

router.get('/:colection/:id', [
    check('id', 'ID is required by mongo').isMongoId(),
    check('colection').custom( c => colectionsAllows(c, ['users', 'products'])),
    fieldsValidate
], showImg),


module.exports = router