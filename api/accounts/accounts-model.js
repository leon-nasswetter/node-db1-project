const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  // DO YOUR MAGIC
  const trimmed = { ...account, name: account.name.trim() };
  const newAccount = await db("accounts").insert(trimmed);
  return await getById(newAccount);
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const trimmed = { ...account, name: account.name.trim() };
  await db("accounts").where("id", id).update(trimmed);
  return getById(id);
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const toBeChopped = await getById(id);
  await db("accounts").where("id", id).delete();
  return toBeChopped;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
