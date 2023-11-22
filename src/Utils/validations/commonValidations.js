import Joi from "joi";

const imagePostSchema = Joi.object({
  user: Joi.string().required(),
  image: Joi.string().required(),
  caption: Joi.string().required()
});

const commentSchema= Joi.object({
  user: Joi.string().required(),
  post: Joi.string().required(),
  text: Joi.string().max(100).required(),
})
export { imagePostSchema,commentSchema};