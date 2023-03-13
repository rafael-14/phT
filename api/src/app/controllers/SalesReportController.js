const SalesReportRepository = require("../repositories/SalesReportRepository");

class SalesReportController {
  async index(req, res) {
    const { initialDate, finalDate } = req.query;
    const salesReport = await SalesReportRepository.findByDate({
      initialDate,
      finalDate,
    });
    res.json(salesReport);
  }
}

module.exports = new SalesReportController();
