const TicketRepository = require("../repositories/TicketRepository");

class TicketController {
  async store(req, res) {
    const { datetime, place, time } = req.body;
    const datetimeNow = new Date().toISOString();
    if (datetime < datetimeNow) return res.sendStatus(400);
    await TicketRepository.create({ datetime, place, time });
    res.sendStatus(200);
  }
}

module.exports = new TicketController();
