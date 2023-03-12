const db = require("../../database");

class CountRepository {
  async count(tableName) {
    let [count] = await db.query(`SELECT COUNT(id) FROM ${tableName}`);
    count = parseInt(count.count / 10) + (count.count % 10 !== 0 ?? 1);
    return count;
  }
}

module.exports = new CountRepository();
