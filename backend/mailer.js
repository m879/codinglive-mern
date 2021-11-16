const nodemailer = require('nodemailer');
  
/*let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.REPLY_EMAIL,
        pass: process.env.REPLY_PASSWORD,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    },
});
  
let mailDetails = {
    from: 'codingliveamu@gmail.com',
    to: 'adeebsamea@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
});*/

const sendEmail = async(email,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        });
    } catch(err){
        var error = new Error("Email Could Not be sent");
        error.status=424;
        console.log(error);
        throw error;
    }
};

module.exports = sendEmail;
