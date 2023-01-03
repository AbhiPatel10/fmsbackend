const nodeMailer = require("nodemailer");
const CONFIG = require("../../config/config");
// const customLogger = require("./customLogger");

const transporter = nodeMailer.createTransport({
  host: 'smtp-mail.outlook.com',
  auth: {
    user: CONFIG.email.EMAILUSERNAME,
    pass: CONFIG.email.EMAILPASSWORD
  }
  // host: CONFIG.email.SMTP,
  // port: CONFIG.email.SMTP_PORT,
  // secure: false,
  // auth: {
  //   user: CONFIG.email.EMAILUSERNAME,
  //   pass: CONFIG.email.EMAILPASSWORD,
  // },
});

module.exports = {
  sendForLeave: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: CONFIG.email.SENDMAILTO,
      subject: CONFIG.emailSubject.Leave,
      text: `  
    Hello Sir/Mem,

        I am writing this application For My ${body.leaveType}, Below is My resone For ${body.leaveType}.

        reson: ${body.reason}
        
        I look forward to your response and also thank you for your consideration.

        Approve:- ${CONFIG.BASEURL}/api/leave/APPROVED/${body.user_id}

        Reject:- ${CONFIG.BASEURL}/api/leave/REJECT/${body.user_id}

    Thanks and Regards

    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      console.error('Email Send Error: ', err);
      // customLogger.error("error shared/helpers/email sendForVerify==>", err);
      return { success: false, message: err.message };
    }
  },
  sendForstatus: async (body, status) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.user_id.email,
      subject: CONFIG.emailSubject.LeaveStatus,
      text: `   
    Hi ${body.user_id.first_name + body.user_id.last_name},

    Your Leave application status is: ${status}
        
    Regards,
    FMS`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      console.error('Email Send Error: ', err);
      // customLogger.error("error shared/helpers/email sendForVerify==>", err);
      return { success: false, message: err.message };
    }
  },
  sendForForgotPassword: async (body, otp, callback) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.forgotPassword,
      // html: `<b>${otp} </b>`,
      text: `   
    Hi ${body.name},
    Please Verify using the OTP :- ${otp}

    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      // customLogger.error("error shared/helpers/email sendForForgotPassword ==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },
  sendForpasswordChange: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.forgotPassword,
      // html: `<b>${otp} </b>`,
      text: `   
    Hi ${body.name},
    Your Password Changed Successfully

    Regards,
    RCA
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      // customLogger.error("error shared/helpers/email  sendForpasswordChange==>", err);
      return { successMail: false, messageMail: err.message };
    }

  },
  sendForAppointmentBookedCustomer: async (body) => {
    let mailOption = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.to,
      subject: CONFIG.emailSubject.appointmentBooking,
      text: `
    Hello ${body.firstName},
    
        You have an appointment on ${body.datetime} with the ${body.outletName} outlet.

    Regrads,
    RCA
            `,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOption);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      // customLogger.error("error shared/helpers/email sendForAppointmentBookedCustomer==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },

  sendForAppointmentBookedOutlet: async (body) => {
    let mailOption = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.to,
      subject: CONFIG.emailSubject.appointmentBooking,
      text: `
        Hello ${body.name}, 
    
            You have an appointment on ${body.datetime} with ${body.userName}.
        
        Regrads,
        RCA
            `,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOption);
      if (sendedMail.response) {
        return { successMail: true, messageMail: "Mail sended" };
      } else {
        return { successMail: false, messageMail: sendedMail };
      }
    } catch (err) {
      // customLogger.error("error shared/helpers/email sendForAppointmentBookedOutlet==>", err);
      return { successMail: false, messageMail: err.message };
    }
  },
};
