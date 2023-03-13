const db = require("../../database");

class TicketRepository {
  async findAll(page) {
    const rows = await db.query(`
      SELECT * FROM tickets ORDER BY data
      LIMIT 10 OFFSET 10 * ${page - 1}
    `);
    return rows;
  }

  async create({ datetime, place, duration, quantity, value }) {
    await db.query(
      `INSERT INTO tickets
      (data, unidade, duracao, quantidade, valor)
      VALUES ($1, $2, $3, $4, $5)`,
      [datetime, place, duration, quantity, value]
    );
  }

  async maximumCapacity({ date, time, place }) {
    const [quantidade_total] = await db.query(`
      SELECT SUM(quantidade) AS quantidade_total
        FROM (
          SELECT * FROM tickets
          WHERE unidade = '${place}'
          AND data BETWEEN '${date}' AND '${date} ${time}:00'
        ) primeira_query
      WHERE (
        data BETWEEN '${date} ${time - 1}:00' AND '${date} ${time}:00'
      ) OR (
        duracao = 3 AND data = '${date} ${time - 2}:00'
      )`);
    return quantidade_total;
  }
}

module.exports = new TicketRepository();
