const  { body, matchedData, validationResult}  = require("express-validator");

const loginValidationRules = () => {
  return [
   
    body('email').not().isEmpty().withMessage("Email Required"),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }).withMessage("Password min 5 character"),
  ]
}

const loginValidate =  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}

const registerValidationRules = () => {
  return [
    // username must be an email
    body('firstname').not().isEmpty().withMessage("Firstname Required"),

    body('lastname').not().isEmpty().withMessage("Lastname Required"),
    
    body('email').isEmail().withMessage("email incorrect"),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }).withMessage("password min 5 character"),
  ]
}

const registerValidate =  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}

module.exports = {
  registerValidationRules,
  loginValidationRules,
  registerValidate,
  loginValidate,
}


