const TicketRepository = require("../repositories/TicketRepository");

class TicketController {
  async index(_req, res) {
    const tickets = await TicketRepository.findAll();
    res.json(tickets);
  }

  async store(req, res) {
    const { datetime, place, time, quantity } = req.body;
    const datetimeNow = new Date().toISOString();
    if (datetime < datetimeNow) return res.sendStatus(400);
    await TicketRepository.create({ datetime, place, time, quantity });
    res.sendStatus(200);
  }
}

module.exports = new TicketController();
