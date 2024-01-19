// import Model Status
const Status = require('../models/status');

// buat class StatusController
class StatusController {
    // buat fungsi
    async index(req, res) {
        try {
            const status = await Status.findAll();
            if (status.length <= 0) {
                const data = {
                    message: "Data is empty",
                };
                return res.status(200).json(data);
            }
            const data = {
                message: "Get all Resource is successfully",
                data: status,
            };
            return res.status(200).json(data);
        } catch (err) {
            const data = {
                message: "Error",
                error: err.message,
            };
            return res.status(500).json(data);
        }
    };

    async store(req, res) {
        try {
            const { name } = req.body;
            const cekStatus = await Status.findOne({ where: { name } });
            if (cekStatus) {
                const data = {
                    message: "Status sudah ada",
                };
                return res.status(409).json(data);
            }
            const status = await Status.create(req.body);
            const data = {
                message: "Resource is added successfully",
                data: status,
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

}

// membuat object StatusController
const object = new StatusController();

// export object StatusController
module.exports = object;

