
const jwtValidate = require('../middlewares/jwt-validate');
const fieldValidate = require('../middlewares/field-validate');
const roleValidate = require('../middlewares/role-validate');

module.exports = {
    ...jwtValidate,
    ...fieldValidate,
    ...roleValidate
}