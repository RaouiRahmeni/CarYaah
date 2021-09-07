require("dotenv");
var db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//---------- ADMIN LOGIN -----------------------//
exports.loginAdmin = async function (req, res) {
  try {
    const { username, password } = req.body;
    const admin = await db.Admin.findOne({
      where: { username },
    });
    if (!admin) throw new Error("Invalid username");

    const validPss = password === admin.password;
    console.log(password, admin.password);
    if (!validPss) throw new Error("Invalid password");

    // create and assign a token
    const token = jwt.sign({ id: admin.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ auth_token: token });
  } catch (err) {
    res.status(403).json(err.message);
  }
};

//---------- ADMIN FETCH ALL CLIENTS------------//
exports.fetchclients = async function (req, res) {
  try {
    const clients = await db.Client.findAll();
    for (let i = 0; i < clients.length; i++) {
      delete clients[i].password;
    }
    res.status(201).send(clients);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
//------------ADMIN FETCH ALL OWNERS-----------//
exports.fetchowners = async function (req, res) {
  try {
    const owners = await db.Owner.findAll();
    for (let i = 0; i < owners.length; i++) {
      delete owners[i].password;
    }
    res.status(201).send(owners);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
//---------------ADMIN FETCH ALL CONFLICTS-------//
exports.fetchconflicts = async function (req, res) {
  try {
    const conflicts = await db.Conflict.findAll();
    res.status(201).send(conflicts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
//--------------ADMIN DELETE CLIENT--------------//
exports.deleteClient = async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    await db.Client.destroy({
      where: { id },
    });
    res.status(200).json({ msg: "client deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
//------------------ADMIN DELETE AN OWNER----------//
exports.deleteOwner = async function (req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    await db.Owner.destroy({
      where: { id },
    });
    res.status(200).json({ msg: "owner deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
