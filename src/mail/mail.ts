import nodemailer from "nodemailer";
import type { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.EMAIL_HOST,
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const createEmailToken = (user: User) => {
    return sign({ userId: user.id }, process.env.JWT_EMAIL_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};

export const sendVerificationEmail = (user: User) => {
    const emailToken = createEmailToken(user);
    // nazwa hosta nie moze byc ze zmiennej srodowiskowej bo render to zmienia na jakies gowno ???
    const url = `https://latin-app.onrender.com/api/v1/auth/confirmation/${emailToken}`;

    transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Confirmation Mail",
        text: url,
    });
};
