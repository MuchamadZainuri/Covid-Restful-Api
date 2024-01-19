// import User model
const User = require("../models/User");
// import bcryptjs
const bcrypt = require("bcrypt");
// import jsonwebtoken
const jwt = require("jsonwebtoken");
// import basic-auth
const auth = require("basic-auth");


// import dotenv
require("dotenv").config();
const { SECRET_KEY } = process.env;


// buat class UserController
class UserController {

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const cekEmail = await User.findOne({ where: { email } });
            if (cekEmail) {
                const data = {
                    message: "Email sudah terdaftar",
                };
                return res.status(409).json(data);
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name: name,
                email: email,
                password: hashPassword,
            });

            if (!user) {
                const data = {
                    message: "Gagal mendaftar",
                };
                return res.status(400).json(data);
            }
            const data = {
                message: "Berhasil mendaftar",
                data: user,
            };
            return res.status(201).json(data);
        } catch (err) {
            const data = {
                message: "Error",
                error: err.message,
            };
            return res.status(500).json(data);
        }

    };


    async login(req, res) {

        try {
            const user = auth(req);
            const email = user.name;
            const password = user.pass;
            const cekEmail = await User.findOne({ where: { email: email } });
            if (cekEmail) {
                const cekPassword = await bcrypt.compare(password, cekEmail.password);
                if (cekPassword) {
                    const token = jwt.sign({ id: cekEmail.id }, SECRET_KEY);
                    const data = {
                        message: "Berhasil login",
                        token: token,
                    };
                    return res.status(200).json(data);
                }
                const data = {
                    message: "Password salah",
                };
                return res.status(401).json(data);
            }
            const data = {
                message: "Email tidak terdaftar",
            };
            return res.status(401).json(data);
        } catch (err) {
            const data = {
                message: "Error",
                error: err.message,
            };
            return res.status(500).json(data);
        }

    };

}

// membuat object UserController
const object = new UserController();

// export object UserController
module.exports = object;