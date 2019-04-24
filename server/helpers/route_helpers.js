const Joi = require('joi');

module.exports = {
    validateBody: (schema) =>{
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }
            if(!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        signUpSchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            address1: Joi.string().required(),
            address2: Joi.string().optional(),
            city: Joi.string().required(),
            province: Joi.string().default('BC').optional(),
            postal_code: Joi.string().optional(),
            depot_name: Joi.string().required(),
        }),
        signInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}
//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required(),