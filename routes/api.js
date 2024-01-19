// import PatientController
const PatientController = require("../controllers/PatientController");
const StatusController = require("../controllers/StatusController");
const UserController = require("../controllers/UserController");

// import middleware
const auth = require("../middleware/auth");
// const validateLogin = require("../middleware/validateLogin");
const validatePost = require("../middleware/validatePost");
const validatePut = require("../middleware/validatePut");
const validateRegister = require("../middleware/validateRegister");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);
router.post("/patients", validatePost, PatientController.store);
router.put("/patients/:id", validatePut, PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/:id",PatientController.show);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead",PatientController.dead);

// Membuat routing status
router.get("/status", StatusController.index);

// Membuat routing user
router.post("/register", validateRegister, UserController.register);
router.post("/login", UserController.login);


// export router
module.exports = router;
