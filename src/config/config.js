module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'R_SECRET',
    DB_USERNAME: process.env.DATABASE_USERNAME,
    DB_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_NAME: process.env.DATABASE_NAME,
    HOST: process.env.HOST,
    EMAIL_PASS: process.env.MAIL_PASS,
    EMAIL_USER: process.env.MAIL_USER,
};
