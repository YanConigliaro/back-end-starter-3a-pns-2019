const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
