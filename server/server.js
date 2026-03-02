import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const jwt_key = process.env.JWT_SECRET;

const app=express()

app.use(express.json());
app.use(cors());

//admin credentials
const admin={
    email:'admin@gmail.com',
    phoneNumber:'9995550101',
    password:'Admin@123'
};


//login route
app.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "All field required" });
  }

  const isEmailMatch = identifier === admin.email;
  const isPhoneMatch = identifier === admin.phoneNumber;
  const isPasswordMatch = password === admin.password;

  if ((isEmailMatch || isPhoneMatch) && isPasswordMatch) {
    const token = jwt.sign(
      { email: admin.email, role: "admin" },
      jwt_key,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

//verify token middleware
function verifyToken (req,res,next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(403).json({message:"no token"});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token,jwt_key,(err,decoded)=>{
        if(err){
           return res.status(401).json({message:'invalid token'});
        }
        req.user=decoded;
        next();
    });
};

//route
app.get('/dashboard',verifyToken,(req,res)=>{
    res.json({
        message:'dashboard',
        admin:req.user
    });
});






app.listen(5000,()=>{
    console.log('http://localhost:5000')
})