const db = require("../../database");

class SalesReportRepository {
  async findByDate({ initialDate, finalDate }) {
    let dateClause;
    if (initialDate && finalDate) {
      dateClause = `data BETWEEN '${initialDate}' AND '${finalDate} 23:59:59'`;
    } else if (initialDate && !finalDate) {
      dateClause = `data >= '${initialDate}'`;
    } else if (!initialDate && finalDate) {
      dateClause = `data <= '${finalDate} 23:59:59'`;
    } else {
      dateClause = "data::date = CURRENT_DATE";
    }
    const tickets = await db.query(
      `SELECT
      	SUM(valor) AS valor_total,
        unidade,
        SUM(quantidade) AS publico,
        duracao
      FROM tickets
      WHERE ${dateClause}
      GROUP BY unidade, duracao
      ORDER BY unidade`
    );
    return tickets;
  }
}

module.exports = new SalesReportRepository();
