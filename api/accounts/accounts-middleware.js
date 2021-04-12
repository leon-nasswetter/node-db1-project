const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name != 'string') {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget != 'number') {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const getAccounts = await Accounts.getAll();
    const accountNameList = req.body.name.trim();

    const nameExists = getAccounts.filter((account) => {
      return account.name === accountNameList;
    });
    nameExists.length > 0
      ? res.status(400).json({ message: "that name is taken" })
      : next();
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const getId = await Accounts.getById(req.params.id);
    getId ? next() : res.status(404).json({ message: "account not found" });
  } catch (err) {
    next(err);
  }
};
