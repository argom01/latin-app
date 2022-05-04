import type { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
};

export default sendRefreshToken;
