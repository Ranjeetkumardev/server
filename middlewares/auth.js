import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
     const token = req.headers.authorization?.replace("Bearer ", ""); 
    if (!token) {
      throw new Error("Token is missing");
    }
    const decoded = jwt.verify(token, "thisisnodecourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ error: "Please authenticate first" });
  }
};

export default auth;
