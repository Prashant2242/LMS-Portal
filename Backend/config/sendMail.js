 import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL,      
      pass: process.env.USER_PASSWORD,
    },
    
  });

  const sendMail = async (to, otp)=>{
       
    // Wrap in an async IIFE so we can use await.
 await transporter.sendMail({
      from: process.env.USER_MAIL,
      to: to,
      subject: "Reset your Password",
      html: ` <p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>` 
    });
  }

  export default sendMail;