const express = require("express");
const router = express.Router();
const researcherController = require("../controllers/researcherController");

// researchers

// ●	GET /researchers 
router.get("/", researcherController.getAllResearchers);

// ●	GET /researchers/:id 
router.get("/:id", researcherController.getResearcherById);

// ●	POST /researchers
router.post("/", researcherController.createResearcher);

// ●	PUT /researchers/:id 
router.put("/:id", researcherController.editarResearcher);

// ●	DELETE /researchers/:id 
router.delete("/:id", researcherController.eliminarResearcher);

module.exports = router;