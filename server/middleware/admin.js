let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send("you are not allowd to add or update");
  }

  next();
};

module.exports = { admin };
