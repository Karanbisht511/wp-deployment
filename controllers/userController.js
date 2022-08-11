require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const marriageDetails = require("../models/marriageDetails");
const { ObjectId } = require("mongodb");
const { hash } = require("bcrypt");

const saltRounds = parseInt(process.env.SALTROUNDS);

exports.Login = async (req, res) => {
  console.log(req.query);
  const data = req.query;
  console.log(data);
  const userId = await User.findOne({ email: data.email })
    .then(async (userInfo) => {
      console.log("userInfo:", userInfo);

      const match = await bcrypt.compare(data.password, userInfo.password);
      console.log(match);
      if (match) {
        console.log("login successfully");
        return userInfo;
      }
      return "login failed";
    })
    .catch((error) => {
      console.log("error:", error);
    });
  console.log(userId);
  if (userId) {
    res.send(userId);
  }
};

exports.getUserInfo = async (req, res) => {
  const data = req.query;
  console.log("id received:", data.userId);
  const id = data.userId;
  const o_id = new ObjectId(id);
  const info = await User.findOne({ _id: o_id })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log("error:", error);
    });
  res.send(info);
};

exports.signup = async (req, res) => {
  console.log(req.body);
  const data = req.body;

  const userId = new ObjectId();

  const hashedPassword = await bcrypt
    .hash(data.password, saltRounds)
    .then((response) => {
      console.log(response);
      return response;
    });

  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    mobile: data.mobile,
    email: data.email,
    password: hashedPassword,
    user_id: userId,
  });

  console.log(newUser);

  //saving new user in user collection
  const responseFromDb = await newUser
    .save()
    .then((response) => {
      console.log("data inserted:", response);
      console.log("data inserted:Signup successfully");
      return "data inserted:Signup successfully";
    })
    .catch((error) => {
      console.log("error:", error);
      return "unexpected error!\n Please check backend console.";
    });

  //saving new user in marriage details collection
  const newUserId = new marriageDetails({
    user_id: userId,
    eventDetails: [],
    relatives: [],
    cardDetails: {},
    invitationTemplate: "",
    decorator: "",
    cosmetologist: "",
    weddingResort: "",
    photographer: "",
    videographer: "",
    travelAgency: "",
  });
  const rs = await newUserId
    .save()
    .then((response) => {
      console.log("marriage document created");
      console.log("marriageDetails db:", response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("rs:", rs);
  res.send(responseFromDb);
};

exports.updateUserInformation = async (req, res) => {
  console.log(req.body);
  let data = req.body;
  let updates = {};
  if (data.firstName) updates.firstName = data.firstName;
  if (data.lastName) updates.lastName = data.lastName;
  if (data.mobile) updates.mobile = data.mobile;
  if (data.address) updates.address = data.address;
  if (data.pincode) updates.pincode = data.pincode;
  if (data.email) updates.email = data.email;
  if (data.newPassword) {
    console.log(data.newPassword);
    bcrypt
      .hash(data.newPassword, saltRounds)
      .then((response) => {
        console.log(hash);
        updates.password = hash;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  console.log(updates);

  const match = await User.findOne({ _id: new ObjectId(data.userId) })
    .then((userInfo) => {
      console.log(userInfo);
      const match = bcrypt.compare(data.currentPassword, userInfo.password);
      return match;
    })
    .catch((error) => {
      console.log(error.message);
    });
  console.log(match);
  if (match) {
    const responseFromDb = await User.updateOne(
      { _id: new ObjectId(data.userId) },
      { $set: updates }
    )
      .then((response) => {
        console.log(response);
        console.log("data updated:Update successfully");
        return "data updated:Update successfully";
      })
      .catch((error) => {
        console.log("error:", error.message);
        return "unexpected error!\n Please check backend console.";
      });
    res.send(responseFromDb);
  } else res.send("Current password is incorrect");
};
