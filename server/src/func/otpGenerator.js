import crypto from "crypto";

const otpGenerator = () => {
    const otp = crypto.randomInt(0, 100000); // 0 - 99999
    return otp.toString().padStart(5, "0");
};

export default otpGenerator;