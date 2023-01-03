module.exports = {
    BASEURL: 'https://famsystem.herokuapp.com',
    IS_DISPLAY_LOG: 'IS_DISPLAY_LOG',
    STATIC_ADMIN_USER: 'admin@gmail.com',
    STATIC_ADMIN_PASSWORD: 'qwer@1234',
    BCRYPT_SALT: 10,
    OTP_EXPIRY: 1,
    mongo: {
        MONGO_USERNAME: 'abhipatel',
        MONGO_PASSWORD: 'abhipatel',
        MONGO_DBNAME: 'Frontendarmy',
        MONGO_HOST: 'cluster0.m3pri.mongodb.net',
        MONGO_PORT: 27017,
    },
    password: {
        length: 8,
        charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz",
    },
    jwt: {
        JWTSECRET: 'JWTSECRET$RCA#Front@done',
        JWTEXPIRY: '1h',
        JWTREFRESHEXPIRY: '3h'
    },
    email: {
        SMTP: "smtp.zoho.com",
        SMTPSERVICE: "Zoho",
        SMTP_PORT: 587,
        IsSSL: true,
        SENDMAILFROM: "Frontarmymanagement@outlook.com",
        EMAILUSERNAME: "Frontarmymanagement@outlook.com",    
        EMAILPASSWORD: "FMS$101#",
        LOGINEMAIL: "admin@gmail.com",
        LOGINPASSWORD: "qwer@1234",
        SENDMAILTO: 'kishan.frontendarmy@gmail.com, abhi.frontendarmy@gmail.com'
    },
    emailSubject: {
        welcome: 'Welcome to RCA',
        Leave: 'Application For Leave',
        LeaveStatus:"Leave Status",
        forgotPassword: 'Your OTP to Change the Password | RCA'
    },
}