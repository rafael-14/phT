const { Router } = require("express");

const TicketController = require("./app/controllers/TicketController");
const SalesReportController = require("./app/controllers/SalesReportController");

const router = Router();

router.get("/api/tickets", TicketController.index);
router.post("/api/ticket", TicketController.store);

router.get("/api/sales_report", SalesReportController.index);

module.exports = router;
