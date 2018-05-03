import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'tel73n@gmail.com',
           pass: 'eletronica*123'
       }
});

const mailOptions = {
    from: 'tel73n@gmail.com', // sender address
    to: 'celorslima@gmail.com', // list of receivers
    subject: 'Email de teste from NODEMAILER', // Subject line
    html: '<p>Hello There, test</p>'// plain text body
};

const sendEmail = (opts) => {
    if(opts) {
        transporter.sendMail(opts, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
        });
    } else  {
        console.log('Parametros de email inválido');
        console.log(opts);
    }
};

export { sendEmail };