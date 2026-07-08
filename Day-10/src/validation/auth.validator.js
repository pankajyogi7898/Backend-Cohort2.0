import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

function registerValidation() {
    return [
        body("username").isString().withMessage("username is should be string"),
        body("email").isEmail().withMessage("email is should be email"),
        body("password").isLength({ min: 6 }).withMessage("password is should be 6 character"),
        validation
    ]

}
export default registerValidation