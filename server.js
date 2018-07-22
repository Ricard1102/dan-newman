const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
const httpsRedirect = require('express-https-redirect');
require('dotenv/config');

var app = express();

const port = process.env.PORT || 3000;




//VIEW ENGINE SETUP
hbs.registerPartials(__dirname + '/views/partials');
//app.engine('hbs', exphbs());
app.set('view engine', 'hbs');


//HTTPS Redirect

app.use('/', httpsRedirect());

//STATIC FOLDER

app.use('/public', express.static(path.join(__dirname + '/public')));

//BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/privacy', (req, res) => {
  res.render('privacy.hbs', {
    company: 'Feet Foremost',
    phone: '+44 (0) 7960 272623',
    mail: 'feetforemost@hotmail.com',
    address: '35 Lime Tree Grove Shirley, Croydon, London, United Kingdom, CR0 8AZ'
  });
});


app.get('/', (req, res) => {
  res.render('home.hbs',
    {
      //Head.hbs variables
      keywords: 'podiatrist Croydon, bunion treatment, nail surgery croydon, chiropodist, diabetes podiatry',
      metaDescription: 'Feet Foremost is a professional podiatry (chiropody) service providing nail surgery, orthotics, foot and assessments and treatment for bunions, verrucaes and other common foot diseases. Home vists available.',
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

      webmail: 'feetforemost@hotmail.com',
      twitter_url: '',
      facebook_url: 'https://www.facebook.com/feetforemost/',
      googleplus_url: '',
      instagram_url: '',
      linkedin_url: 'https://www.linkedin.com/in/daniel-newman-b9800972/',

      //treatments
      treatment1: 'Initial Podiatry Appointment',
      price1: '£45',
      duration1: '40min',
      treatment2: 'Routine Podiatry Appointments',
      price2: '£45.00',
      treatment25: 'Home visits',
      price25: '£50.00',
      duration2: '30min',
      treatment3: 'Luxury Medi Pedi & Foot Spa',
      price3: '£55.00',
      duration3: '30-40min',
      treatment4: 'Nail Surgery',
      price4: '£350.00/450.00',
      duration4: '60min',
      treatment5: 'Biomechanical Assessment',
      price5: '£70.00',
      duration5: '50min',
      treatment6: 'Orthotics',
      price6: '£50-150',
      duration6: '30min',
      treatment7: 'Pedique Nail Aesthetics',
      price7: '',
      duration7: '',
      //Maps
      address: '35 Lime Tree Grove Shirley, Croydon, CR0 8AZ',
      map_link: 'https://www.google.com/maps/place/35+Lime+Tree+Grove,+Croydon+CR0+8AZ/@51.369574,-0.0360564,17z/data=!3m1!4b1!4m5!3m4!1s0x48760042ea7de2ff:0xdd1840d151fa370e!8m2!3d51.3695707!4d-0.0338677',


      //Services variables
      cancellationPolicy1: '',
      cancellationPolicy2: '',
      cancellationPolicy3: '',


      //Contact Variables
      businessPhone: '07960 272623'




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
    <li>GDPR Consent: ${req.body.gdpr}</li>
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







