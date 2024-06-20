import jwt from "jsonwebtoken"
import "dotenv/config"
const isAuthenticated = async (req , res, next)=>{
    try {
        const Token = req.cookies.Token;
        if(!Token){
            return res.status(401).json({message:"user not authenticated"})
        }
        const decode = await jwt.verify(Token,process.env.JWT_SECRETE_KEY )
       
        if(!decode){
            return res.status(401).json({message: "invalid token"})
        }
        req.id = decode.UserId
          next()

    } catch (error) {
        console.log(error)
    }
}
export default isAuthenticated