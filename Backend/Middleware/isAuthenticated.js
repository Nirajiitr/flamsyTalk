import jwt from "jsonwebtoken";
import "dotenv/config";

const isAuthenticated = async (req, res, next) => {
  try {
   
    let token = req.headers.authorization?.split(" ")[1];

   
    if (!token) {
      token = req.cookies.Token;
    }

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRETE_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

  
    req.id = decoded.UserId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuthenticated;
