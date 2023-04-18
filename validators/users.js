const { Joi, Segments } = require('celebrate');

const schemaName = Joi.string().min(2).max(30);
const schemaEmail = Joi.string().email();
const schemaPassword = Joi.string().min(8).required();

const schemaObjectProfile = Joi.object({
  name: schemaName,
  email: schemaEmail,
}).required();
const schemaObjectAuth = Joi.object({
  email: schemaEmail.required(),
  password: schemaPassword,
}).required();
const schemaObjectUser = schemaObjectAuth.concat(schemaObjectAuth).concat(
  Joi.object({
    name: schemaName.required(),
  }).required()
);

const segmentBodyProfile = { [Segments.BODY]: schemaObjectProfile };
const segmentBodyAuth = { [Segments.BODY]: schemaObjectAuth };
const segmentBodyUser = { [Segments.BODY]: schemaObjectUser };

module.exports = {
  schemaName,
  schemaEmail,
  schemaPassword,
  segmentBodyProfile,
  segmentBodyAuth,
  segmentBodyUser,
  celebrateBodyProfile,
  celebrateBodyAuth,
  celebrateBodyUser,
};
