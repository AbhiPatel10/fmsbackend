const router = require("express").Router();
// const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../users/users.model");
const RightsService = require("../rights/rights.service");
const Rights = require("../rights/rights.model");
const pagination = require("../../shared/helpers/pagination");
// const RightsService = require("../rights/rights.service");
const loginvadidator = require('./login.validator')

router.post("/", loginvadidator.login, async (req, res) => {
  const { email, password } = req.body;
  const passwordd = password.trim();
  try {
    let user = await User.findOne({ email: email.trim() }).populate(['role']);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Please try to login with correct credentials",
        data: "",
      });
    }

    const passwordCompare = await bcrypt.compare(passwordd, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).send({
        success: passwordCompare,
        message: "Password not match",
        data: passwordCompare,
      });
    }

    const data1 = {
      user: {
        id: user._id,
      },
    };

    const authtoken = jwt.sign(data1, "Front@end$army#FAMS", {
      expiresIn: "120m",
    });

    const rightsDetail = await RightsService.list(
      { user_id: user._id },
      {
        page: 1,
        rowsPerPage: 1000,
        sortBy: "createdAt",
        descending: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "login Successfully",
      data: {
        token: authtoken,
        rights:
          rightsDetail.data.list && rightsDetail.data.list.length > 0
            ? rightsDetail.data.list[0]?.rights
            : [],
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role?.name,
        image: user?.image
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
});

module.exports = router;
