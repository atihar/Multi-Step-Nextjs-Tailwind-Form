// pages/api/hello.js
import { createRouter } from "next-connect";
let nodemailer = require('nodemailer')

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get((req, res) => {
    res.send("Hello world");
  })
  .post(async (req, res) => {
    // use async/await
    const data = req.body.data
    console.log(data);

  const transporter = nodemailer.createTransport({
    host: 'mail.atiharhossanmahir.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'dev@atiharhossanmahir.com',
      pass: process.env.PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  //building email for user activation
  const mailData = {
    from: 'Website Form',
    to: process.env.RECEIVER,
    subject: `Complete your account`,
    text: 'Hello,\n Welcome. Please click on the link to verify your account.\n',
    html: `
    <!DOCTYPE html>
  <html>
        <h1>A new employee just filled the form. Detailed</h1>
        <p>First Name : ${data.firstName}</p>
        <p>Last Name : ${data.lastName}</p>
        <p>Address : ${data.address}</p>
        <p>City : ${data.city}</p>
        <p>Country : ${data.country}</p>
        <p>Favourite social media : ${data.favSocial}</p>
        <p>Spends time on social media(daily hrs) : ${data.avgOnSocial}</p>
        <p>Favorite Book : ${data.favBook}</p>
        <p>Favorite Color : ${data.favColor}</p>
        <p>Favorite Book : ${data.favBook}</p>
        <p>Current company : ${data.company}</p>
        <p>Portfolio Link : ${data.portfolio}</p>
        <p>GitHub Link : ${data.github}</p>
        <p>Notice Period : ${data.notice}</p>
  </html>`
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err)
    // res.send("error" + JSON.stringify(err));
      console.log(err)
    else
    // res.send("success");
      console.log(info)
  })

})

// onError and onNoMatch
export default router.handler({
   onError: (err, req, res, next) => {
     console.error(err.stack);
     res.status(500).end("Something broke!");
   },
   onNoMatch: (req, res) => {
     res.status(404).end("Page is not found");
   },
 });
