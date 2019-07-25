const Joi = require('joi');
const Config = require('../configuration');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {

      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signUp: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      unit: Joi.string().optional(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      province: Joi.string().required(),
      postalCode: Joi.string().optional(),

      depotName: Joi.string().required(),
    }),

    signIn: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),

    getPost: {
      id: Joi.object().keys({
        postId: Joi.string().required(),
      }),
      type: Joi.object().keys({
        type: Joi.string().valid(Config.BOARD_TYPE).required(),
      })
    },

    createPost: Joi.object().keys({
      type: Joi.string().valid(Config.BOARD_TYPE).required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      authorId: Joi.string().required(),
      authorName: Joi.string().required(),
      password: Joi.string().required()
    }),

    updatePost: Joi.object().keys({
      type: Joi.string().valid(Config.BOARD_TYPE),
      postId: Joi.string().required(),
      update: {
        title: Joi.string().required(),
        content: Joi.string().required(),
        password: Joi.string().required()
      }
    }),

    deletePost: Joi.object().keys({
      postId: Joi.string().required(),
    }),

    getPage: Joi.object().keys({
      type: Joi.string().valid(Config.BOARD_TYPE).required(),
    }),

    createPage: Joi.object().keys({
      type: Joi.string().valid(Config.BOARD_TYPE).required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      authorId: Joi.string().required(),
      authorName: Joi.string().required(),
    }),

    updatePage: Joi.object().keys({
      type: Joi.string().valid(Config.BOARD_TYPE),
      postId: Joi.string(),
      update: {
        content: Joi.string().required(),
      }
    }),

    deletePage: Joi.object().keys({
      postId: Joi.string(),
      type: Joi.string().valid(Config.BOARD_TYPE).required(),
    }),

    getUser: {
      getAll: Joi.object().keys({}),
      getOne: Joi.object().keys({
        userId: Joi.string().required(),
      })
    },

    updateUser: Joi.object().keys({
      userId: Joi.string().required(),

      unit: Joi.string().optional(),
      address: Joi.string().optional(),
      city: Joi.string().optional(),
      province: Joi.string().optional(),
      postalCode: Joi.string().optional(),

      depotName: Joi.string().optional(),
    }),

    getComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
    }),

    createComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
      content: Joi.string().required(),

      status: Joi.string().required().default("ACTIVE"),
    }),

    updateComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
      content: Joi.string().optional(),

      status: Joi.string().optional(),
    }),

    deleteComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
    }),

  }
}

//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()