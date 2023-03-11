const db = require("../../database");

class TicketRepository {
  async create({ datetime, place, time }) {
    await db.query(
      `INSERT INTO tickets
      (data, unidade, duracao)
      VALUES ($1, $2, $3)`,
      [datetime, place, time]
    );
  }
}

module.exports = new TicketRepository();
