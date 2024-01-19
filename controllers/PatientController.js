// import Model Patient
const { Op } = require('sequelize');
const Patient = require('../models/Patient');

// buat class PatientController
class PatientController {

  async index(req, res) {
    try {
      const patients = await Patient.findAll();
      if (patients.length <= 0) {
        const data = {
          message: "Data is empty",
        }
        return res.status(200).json(data);
      }

      const data = {
        message: "Resource is found",
        data: patients
      }
      return res.status(200).json(data);

    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async store(req, res) {
    try {
      const patient = await Patient.create(req.body);
      if (!patient) {
        const data = {
          message: "Gagal menambahkan data",
        }
        return res.status(400).json(data);
      }
      const id = patient.id;
      const showPatient = await Patient.findByPk(id);
      const data = {
        message: "Resource is added successfully",
        data: showPatient
      }
      return res.status(201).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async update(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!id || !patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }

      const patients = await Patient.update(req.body, { where: { id: id } });
      const show = await Patient.findByPk(id);
      const data = {
        message: "Resource is update successfully",
        data: show
      }
      return res.status(200).json(data);

    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!id || !patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }

      await Patient.destroy({ where: { id: id } });
      const data = {
        message: "Resource is delete successfully",
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async show(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!id || !patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }

      const data = {
        message: "Get Detail Resource",
        data: patient
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }

  };

  async search(req, res) {
    try {
      const { name } = req.params;
      const patient = await Patient.findAll({ where: { name: { [Op.like]: `%${name}%` } } });
      if (!name || patient.length <= 0) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }
      const data = {
        message: "Get searched resource",
        data: patient
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async positive(req, res) {
    try {
      const patient = await Patient.findAll({ where: { status_id: 1 } });
      if (!patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }
      const data = {
        message: "Get positive resource",
        data: patient
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async recovered(req, res) {
    try {
      const patient = await Patient.findAll({ where: { status_id: 2 } });
      if (!patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }
      const data = {
        message: "Get recovered resource",
        data: patient
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };

  async dead(req, res) {
    try {
      const patient = await Patient.findAll({ where: { status_id: 3 } });
      if (!patient) {
        const data = {
          message: "Resource not found",
        }
        return res.status(404).json(data);
      }
      const data = {
        message: "Get dead resource",
        data: patient
      }
      return res.status(200).json(data);
    } catch (err) {
      const data = {
        message: "Error",
        error: err.message
      }
      return res.status(500).json(data);
    }
  };
  
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
