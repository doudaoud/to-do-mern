const router = require("express").Router();
const asyncHandler = require("express-async-handler");
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
      let  response = await senMail(mail);
      // console.log(response);
      if ( response.status === 200) {
        console.log("okeey");
        return res.status(200).json({ message: "mail sended", passwordverif });
      } else {
        return res.status(500).json({ message: "mail not sended" });
      }
    }
    // res.status(200).json({ message: "user register" });
  }),
);

module.exports = router;
