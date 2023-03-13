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
    const { date, place, time, quantity, duration } = req.body;
    const datetime = `${date} ${time}:00`;
    const { quantidade_total } = await TicketRepository.maximumCapacity({
      date,
      time,
      place,
    });
    if (quantity > 100 - quantidade_total) return res.sendStatus(400);
    const datetimeNow = new Date().toISOString();
    if (datetime < datetimeNow) return res.sendStatus(400);
    const value = quantity * (Number(time) === 2 ? 89 : 109);
    await TicketRepository.create({
      datetime,
      place,
      duration,
      quantity,
      value,
    });
    res.sendStatus(200);
  }
}

module.exports = new TicketController();
