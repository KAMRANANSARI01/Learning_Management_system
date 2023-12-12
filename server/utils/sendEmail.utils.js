import nodemailer from "nodemailer";

const sendEmail = async function (email,subject,message){
//create reusable transporter object using the default SMPT transport

let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port : process.env.SMPT_PORT,
    secure : false,
    auth:{
        user: process.env.SMPT_USERNAME,
        pass : process.env.SMPT_PASSWORD
    }
})
  //send mail with defined transport object
  await transporter.sendMail({
    from : process.env.SMTP_FROM_EMAIL,//sender address
    to : email, //user email
    subject : subject,//subject line
    html : message//html body
  })
}

export{
    sendEmail
}