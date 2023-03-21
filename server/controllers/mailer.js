import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';



import ENV  from '../config.js'


 //https://ethreal.email/create

 let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    },

 }

 let transporter = nodemailer.createTransport(nodeConfig);
 let  MailGenerator = new Mailgen( {
      theme: "default",
      product : {
        name:"Mailgen",
        link: 'https://mailgen.js'
      }
 })

 export const registerMail = async (req, res) => {

    const { username, UserEmail,text,subject } = req.body;

    // body of the email
    var email = {
        body : {
            name:username,
            intro : text || 'We are very excited to have you on board',
            outro : 'Need help,or have Questions? Just reply to this email.We would love to help'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to:UserEmail,
        subject : subject || "Signup Successful",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)

    .then(() => {
        return res.status(200).send({ msg : "You should receive an email from us"})
    })
    .catch(error => res.status(500).send({ error}))

    
 }