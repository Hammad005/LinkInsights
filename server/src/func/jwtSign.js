import jwt from "jsonwebtoken";

export const jwtSign = (user, res, expiresIn) => {

    const accessToken  = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });

    const deletePasswordFromUser = { ...user._doc };
    delete deletePasswordFromUser.password;

    return res.status(200).json({ accessToken, user: deletePasswordFromUser });
};