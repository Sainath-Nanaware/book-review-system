const Joi=require('joi')


const addReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().default("N/A"),
});

module.exports={addReviewSchema}