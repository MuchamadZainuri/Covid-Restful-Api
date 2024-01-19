// import PatientController
const PatientController = require("../controllers/PatientController");
const StatusController = require("../controllers/StatusController");
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");

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
router.get("/patients", auth, PatientController.index);
router.post("/patients", auth, PatientController.store);
router.put("/patients/:id", auth,PatientController.update);
router.delete("/patients/:id", auth, PatientController.destroy);
router.get("/patients/:id", auth,PatientController.show);
router.get("/patients/search/:name", auth, PatientController.search);
router.get("/patients/status/positive", auth, PatientController.positive);
router.get("/patients/status/recovered", auth, PatientController.recovered);
router.get("/patients/status/dead", auth,PatientController.dead);

// Membuat routing status
router.get("/status", auth, StatusController.index);
router.post("/status", auth, StatusController.store);

// Membuat routing user
router.post("/register", UserController.register);
router.post("/login", UserController.login);


// export router
module.exports = router;
