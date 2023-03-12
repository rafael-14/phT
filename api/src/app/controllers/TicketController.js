const CountRepository = require("../repositories/CountRepository");
const TicketRepository = require("../repositories/TicketRepository");

class TicketController {
  async index(req, res) {
    const { page } = req.query;
    const count = await CountRepository.count("tickets");
    const tickets = await TicketRepository.findAll(page);
    res.json({ tickets, count });
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
