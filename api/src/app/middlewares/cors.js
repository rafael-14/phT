module.exports = (_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  next();
};
