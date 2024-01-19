const { check, validationResult } = require('express-validator');

const rules = [
    check('name')
        .notEmpty().withMessage('Name tidak boleh kosong')
        .isString().withMessage('Name harus berupa string')
        .isLength({ min: 3 }).withMessage('Name minimal 3 karakter')
        .isLength({ max: 45 }).withMessage('Name maksimal 45 karakter')
        .trim()
        .escape(),
    
    check("phone")
        .notEmpty().withMessage('Phone tidak boleh kosong')
        .isString().withMessage('Phone harus berupa string')
        .isLength({ min: 10 }).withMessage('Phone minimal 10 karakter')
        .isLength({ max: 14 }).withMessage('Phone maksimal 14 karakter')
        .trim()
        .escape(),
    
    check("address")
        .notEmpty().withMessage('Address tidak boleh kosong')
        .isString().withMessage('Address harus berupa string')
        .trim()
        .escape(),
    
    check("status_id")
        .notEmpty().withMessage('id status tidak boleh kosong')
        .isInt().withMessage('id status harus berupa angka')
        .trim()
        .escape(),
    
    check("in_date_at")
        .isDate().withMessage('in date harus berupa tanggal')
        .trim()
        .escape(),
    
    check("out_date_at")
        .isDate().withMessage('out date harus berupa tanggal')
        .trim()
        .escape(),
];

const validatePost = [
    rules,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];

module.exports = validatePost;