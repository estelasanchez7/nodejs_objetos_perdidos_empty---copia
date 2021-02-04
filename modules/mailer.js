const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}

mailer.send = async function send(destinatario) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com', // generated ethereal user
      pass: 'Fullstack#01', // generated ethereal password
    },
  })

  // send mail with defined transport object
  //mailer.getTemplate(template)
  //  .then(datos=>
      let info = await transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // sender address
            to: destinatario, // list of receivers
            subject: "Registro usuario nuevo", // Subject line
            text: "Estos son sus datos", // plain text body
            html: "<h1>activar tu cuenta</h1>"
          })
  //  )
  console.log(info)
}
module.exports=mailer