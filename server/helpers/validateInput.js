const Joi = require('joi');
const Config = require('../configuration');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {
        abortEarly: false
      });
      result.catch(error => {
        return res.status(400).json({ error: "input validation failed" });
      });
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
      password: Joi.string().min(8).max(16).regex(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/).required(),
      unit: Joi.string().optional(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      province: Joi.string().required(),
      postalCode: Joi.string().optional(),
      comment: Joi.string(),
      depotName: Joi.string().required(),
    }),


    signIn: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(16).regex(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/).required(),
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
      content: Joi.string().required()
    }),

    updatePost: Joi.object().keys({
      postId: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required()
    }),

    deletePost: Joi.object().keys({
      postId: Joi.string().required(),
    }),

    getPage: Joi.object().keys({
      type: Joi.string().valid(Config.PAGE_TYPE).required(),
    }),

    createPage: Joi.object().keys({
      type: Joi.string().valid(Config.PAGE_TYPE).required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }),

    updatePage: Joi.object().keys({
      type: Joi.string().valid(Config.PAGE_TYPE).required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }),

    deletePage: Joi.object().keys({
      postId: Joi.string(),
      type: Joi.string().valid(Config.PAGE_TYPE).required(),
    }),

    getUser: {
      getAll: Joi.object().keys({}),
      getOne: Joi.object().keys({
        userId: Joi.string().required(),
      })
    },

    updateUser: Joi.object().keys({
      userId: Joi.string().required(),
      name: Joi.string().optional(),
      password: Joi.string().optional(),
      phone: Joi.string().optional(),
      unit: Joi.string().optional(),
      address: Joi.string().optional(),
      city: Joi.string().optional(),
      province: Joi.string().optional(),
      postalCode: Joi.string().optional(),

      depotName: Joi.string().optional(),
    }),

    getComment: Joi.object().keys({
      postId: Joi.string().required(),
    }),

    createComment: Joi.object().keys({
      postId: Joi.string().required(),
      content: Joi.string().required(),
    }),

    updateComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
      content: Joi.string().optional(),
    }),

    deleteComment: Joi.object().keys({
      postId: Joi.string().required(),
      commentId: Joi.string().required(),
    }),

    createHistory: Joi.object().keys({
      title: Joi.string().required(),
      year: Joi.string().regex(/^\d{4}$/).required(),
      month: Joi.string().regex(/^(0?[1-9]|1[012])$/).required(),
      content: Joi.string()
    }),

    updateHistory: Joi.object().keys({
      historyId: Joi.string().required(),
      title: Joi.string(),
      year: Joi.string().regex(/^\d{4}$/),
      month: Joi.string().regex(/^(0?[1-9]|1[012])$/),
      content: Joi.string()
    }),

    deleteHistory: Joi.object().keys({
      historyId: Joi.string().required(),
    }),

  }
}

//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()