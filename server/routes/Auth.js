const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { users, validationDataRegister } = require("../models/user");
const { createMail, senMail } = require("../utils/sendMailverif");
/**
 * @method  POST
 * @route /api/register
 * @description user registration
 * @access public
 */

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { err } = validationDataRegister(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
      
    } else {
      const passwordverif = Math.floor(100000 + Math.random() * 900000);
      const mail = createMail(req.body.email, passwordverif);
      let response = await senMail(mail);
      console.log(response);
      console.log(typeof response.temps);
      if (response.status === 200) {
        console.log("okeey");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.mdps, salt);
        return res.status(200).json({
          message: "mail sended",
          temps: response.temps,
          passwordverif,
          password: hash,
        });
      } else {
        return res.status(500).json({ message: "mail not sended" });
      }
    }
    // res.status(200).json({ message: "user register" });
  }),
);
/**
 * @method  POST
 * @route /api/createuser
 * @description user creation
 * @access public
 */
router.post(
  "/createuser",
  asyncHandler(async (req, res) => {
    const { email, mdps, name } = req.body;
    const new_user = new users({
     nomComplet: name,
     Email: email,
      password:mdps,
    });
    await new_user.save();
    res.status(200).json({ message: "user created", status:201 });
  }),
);
module.exports = router;
