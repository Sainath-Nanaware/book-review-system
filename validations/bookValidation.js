const Joi = require("joi");


const addBookSchema = Joi.object({
  title: Joi.string().min(1).max(30).required().messages({
    "string.empty": "title is required",
    "string.min": "title must be at least 1 characters",
    "string.max": "title must not exceed 30 characters",
  }),
  author: Joi.string().max(30).optional().messages({
    "string.max": "title must not exceed 30 characters",
  }),
  description: Joi.string().max(180).optional().messages({
    "string.max": "title must not exceed 180 characters",
  }),
});

module.exports={addBookSchema}