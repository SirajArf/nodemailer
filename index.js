const express = require('express');
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();

const app = express();



//view engine 
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public' )));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//basic route
app.get('/', (req, res) => {
    res.render('main')
});

app.post('/send', (req, res) => {
    console.log(req.body);
//     const output = `
     
      
//      <ul>  
//         <li>Name: ${req.body.name}</li>
//         <li>Company: ${req.body.contact}</li>
//         <li>Email: ${req.body.email}</li> 
//       </ul>
//       <h3>Message</h3>
//       <p>${req.body.message}</p>
//    `;
   //console.log(output)
   let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.USERNAME1, // generated ethereal user
        pass:  process.env.password // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  let mailOptions = {
    from: '"For Testing" <rahmansiraj170@gmail.com>', // sender address
    to: 'siraj.arfeen@gmail.com', // list of receivers
    subject: 'from nodemailer', // Subject line
    text: req.body.message, // plain text body
   // html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('main', {msg:'Email has been sent'});
});
  
});


//server running
app.listen(port, () => {
    //console.log(process.env.USERNAME1)
    //console.log(process.env.PASSWORD)
    console.log(`server is running at port no ${port}`)
});


