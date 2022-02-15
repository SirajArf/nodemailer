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

   let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.USERNAME1, 
        pass:  process.env.password 
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  let mailOptions = {
    from: '"For Testing" <rahmansiraj170@gmail.com>', 
    to: req.data.email, 
    subject: 'from nodemailer', 
    text: req.body.message, 
  
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



app.listen(port, () => {
  
    console.log(`server is running at port no ${port}`)
});


