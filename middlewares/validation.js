const { celebrate, Joi } = require('celebrate')
const validator = require('validator')

// URL custom validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }
  return helpers.error('string.uri')
}

// Login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': "The 'email' filed must be filled in",
      }),
    password: Joi.string().required().messages({
      'string.empty': "The 'password' field must be filled in",
    }),
  }),
})

// User creation validation
const validateUserCreation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The email filed must be a valid email')
      .messages({
        'string.empty': "The 'email' filed must be filled in",
      }),
    password: Joi.string().required().messages({
      'string.empty': "The 'password' field must be filled in",
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': "The minimum lenght of the 'name' field is 2",
      'string.max': "The maximum lenght of the 'name' field is 30",
      'string.empty': "The 'name' filed must be filled in",
    }),
  }),
})

// userId validation
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().message('The id is invalid').messages({
      'string.empty': "The 'Id' filed must be filled in",
    }),
  }),
})

// articleId validation
const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().message('The id is invalid').messages({
      'string.empty': "The 'Id' filed must be filled in",
    }),
  }),
})

// save article validator
const saveArticleValidation = celebrate({
  body: {
    keyword: Joi.string().required().messages({
      'string.empty': "The 'keyword' filed must be filled in",
    }),
    title: Joi.string().required().messages({
      'string.empty': "The 'title' filed must be filled in",
    }),
    text: Joi.string().required().messages({
      'string.empty': "The 'text' filed must be filled in",
    }),
    date: Joi.string().required().messages({
      'string.empty': "The 'date' filed must be filled in",
    }),
    source: Joi.string().required().messages({
      'string.empty': "The 'source' filed must be filled in",
    }),
    link: Joi.string()
      .required()
      .custom(validateURL)
      .message("The 'link' field must be a valid URL")
      .messages({
        'string.empty': "The 'link' field must be filled in",
      }),
    image: Joi.string()
      .required()
      .custom(validateURL)
      .message("The 'image' field must be a valid URL")
      .messages({
        'string.empty': "The 'image' field must be filled in",
      }),
  },
})

module.exports = {
  validateAuthentication,
  validateUserCreation,
  validateUserId,
  validateArticleId,
  saveArticleValidation,
}
