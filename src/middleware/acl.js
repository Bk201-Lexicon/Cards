module.exports = (a) =>
  function (req, res, next) {
    console.log("ACL middleware" + a);
    next();
  };
