const express = require('express');
const router = express.Router();
const {getContact,createContact,updateContact, getContactbyId, deleteContact} = require("../controllers/contactController.js");
/*
router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(getContactbyId);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

sorting them out*/

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getContactbyId).put(updateContact).delete(deleteContact);


module.exports = router;