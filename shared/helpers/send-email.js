var nodemailer = require("nodemailer");
module.exports = {
    email: async (newpassword, data) => {
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {
        user: "Frontarmymanagement@outlook.com",
        pass: "FMS$101#",
        },
    });

    var mailOptions = {
        from: "Frontarmymanagement@outlook.com",
        to: data.email,
        subject: "Your Credetials For Login in FAMSYSTEM",
        // text: ``,
        html: `<h1>Welcome to Front Army</h1><br><br><p>User id:- ${data.email}</p><br><p>Your Password is :- ${newpassword}</p>`,
    };
    const sendedMail = await transporter.sendMail(mailOptions);
    
    if (sendedMail.response) {
        return {
        successMail: true,
        message: "Sent",
        }
        // callback("send Successfullly")
    } else {
        return {
            successMail: false,
            message: sendedMail,
        }
        // callback(new Error ('Url must be a string'), null, null)
    }
    }
}