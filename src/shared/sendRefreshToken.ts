import type { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/api/v1/auth/refresh_token",
    });
};

export default sendRefreshToken;
