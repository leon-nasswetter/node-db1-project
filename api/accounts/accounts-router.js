const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const account = await Accounts.create(req.body);
      res.status(201).json(account);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const data = await Accounts.updateById(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.deleteById(req.params.id);
    res.status(204).json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
