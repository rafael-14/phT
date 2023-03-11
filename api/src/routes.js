const { Router } = require("express");

const TicketController = require("./app/controllers/TicketController");

const router = Router();

router.post("/api/ticket", TicketController.store);


module.exports = router;