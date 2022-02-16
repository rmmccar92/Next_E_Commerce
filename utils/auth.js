import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
export { signToken, isAuth };
