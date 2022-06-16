import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const expiration =
    process.env.NODE_ENV === "developments" ? 100000000 : 604800000;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: true, // set to true if your using https
    httpOnly: true,
  });
};
export default generateToken;
