const db = require("../../database");

class TicketRepository {
  async findAll() {
    const rows = await db.query(`SELECT * FROM tickets ORDER BY 1`);
    return rows;
  }

  async create({ datetime, place, time, quantity }) {
    await db.query(
      `INSERT INTO tickets
      (data, unidade, duracao, quantidade)
      VALUES ($1, $2, $3, $4)`,
      [datetime, place, time, quantity]
    );
  }
}

module.exports = new TicketRepository();
