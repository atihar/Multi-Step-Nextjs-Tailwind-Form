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
   res.status(201).send({message : "ok"})
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

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'dutao.ae@gmail.com',
      pass: 'Dutao@123',
    },
    secure: true,
  })

  //building email for user activation
  const mailData = {
    from: 'no-reply@dutao.com',
    to: 'mahir.mahir890@gmail.com',
    subject: `Complete your account`,
    text: 'Hello,\n Welcome. Please click on the link to verify your account.\n',
    html: `
    <!DOCTYPE html>
  <html>
        <h1>Working</h1>
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