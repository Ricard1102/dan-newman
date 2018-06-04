const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;

//VIEW ENGINE SETUP
hbs.registerPartials(__dirname + '/views/partials');
//app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: '',
      metaDescription: '',
      pageTitle: 'Feet Foremost',

      //Header.hbs variables
      logo: 'public/img/logo.png',
      logoCaption: 'Feet foremost logo',
      logoTitle: 'Feet Foremost',
      // menu1: '',
      // menu2: '',
      // menu3: '',
      // menu4: '',
      // menu5: '',
      //Hero variables
      h1Title: 'Feet Foremost',

      webmail: 'web@mail.com',
      twitter_url: '',
      facebook_url: '',
      googleplus_url: '',
      instagram_url: '',
      linkedin_url: '',

      //treatments
      treatment1: 'Treatment title 1',
      price1: '',
      duration1: '',
      treatment2: 'Treatment title 2',
      price2: '',
      duration2: '',
      treatment3: 'Treatment title 3',
      price3: '',
      duration3: '',
      treatment4: 'Treatment title 4',
      price4: '',
      duration4: '',
      treatment5: 'Treatment title 5',
      price5: '',
      duration5: '',
      treatment6: 'Treatment title 6',
      price6: '',
      duration6: '',
      treatment7: 'Treatment title',
      price7: '',
      duration7: '',
      //Maps
      address: '35 Lintree Grove Shirley, Croydon, London, United Kingdom, CR0 8AZ',
      map_link: 'https://www.google.com/maps/place/35+Lime+Tree+Grove,+Croydon+CR0+8AZ/@51.369574,-0.0360564,17z/data=!3m1!4b1!4m5!3m4!1s0x48760042ea7de2ff:0xdd1840d151fa370e!8m2!3d51.3695707!4d-0.0338677',


      //Services variables
      cancellationPolicy1: 'Feet Foremost operates a cancellation policy. Our policy is similar to many other medical clinics and we ask all patients kindly to adhere to it.',
      cancellationPolicy2: 'Should you wish to cancel or reschedule an appointment we simply ask you to give a minimum of 24 hours notice. If this minimum is not adhered to, we reserve the right to charge 50% treatment cost of the appointment.',
      cancellationPolicy3: 'We are aware that from time to time individual circumstances dictate that an appointment will be missed or less than the 24 hours notice will be given. On such occasions we can be lenient but frequent missed appointments can be very disruptive to the smooth running of Step to Serenity and can also be inconvenient to other patients that require an appointment slot',


      //Contact Variables
      businessPhone: '000 111 333'




    });


});

app.post('/send', (req, res) => {
  const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Treatment: ${req.body.treatment}</li>
    <li>Message: ${req.body.message}</li>
    </ul>`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 25, //587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: 'Contact request', // Subject line
    text: 'Hello world', // plain text body
    html: output // html body
  };

  // send mail with defined transport object


  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('partials/thanks', { businessName: 'Feet Foremost' });



  });

});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});







