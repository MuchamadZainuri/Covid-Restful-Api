const { check, validationResult } = require('express-validator');

const rules = [
    check("name")
        .notEmpty().withMessage('Name tidak boleh kosong')
        .isString().withMessage('Name harus berupa string')
        .isLength({ min: 5 }).withMessage('Name minimal 5 karakter')
        .isLength({ max: 45 }).withMessage('Name maksimal 45 karakter')
        .trim()
        .escape(),

    check("email")
        .notEmpty().withMessage('Email tidak boleh kosong')
        .isString().withMessage('Email harus berupa string')
        .isEmail().withMessage('Email tidak valid')
        .isLength({ max: 25 }).withMessage('Email maksimal 25 karakter')
        .isLowercase().withMessage('Email harus berupa lowercase')
        .trim()
        .escape(),

    check("password")
        .notEmpty().withMessage('Password tidak boleh kosong')
        .isString().withMessage('Password harus berupa string')
        .isLength({ min: 8 }).withMessage('Password minimal 8 karakter')
        .isLength({ max: 14 }).withMessage('Password maksimal 14 karakter')
        .trim()
        .escape(),
];

const validateRegister = [
    rules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = validateRegister;