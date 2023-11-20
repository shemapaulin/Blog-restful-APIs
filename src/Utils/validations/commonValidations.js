import Joi from "joi";

const imagePostSchema = Joi.object({
  user: Joi.string().required(),
  image: Joi.string().required(),
  caption: Joi.string().required()
});

export default imagePostSchema;