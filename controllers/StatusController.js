// import Model Status
const Status = require('../models/Status');

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

}

// membuat object StatusController
const object = new StatusController();

// export object StatusController
module.exports = object;

