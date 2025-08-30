import express from "express";
import {
  signup,
  verifySignupOtp,
  login,
  verifyLoginOtp,
  googleLogin,
} from "../controllers/authController.js";
import {
  signupValidator,
  loginValidator,
  otpValidator,
} from "../validators/authValidator.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/verify-signup-otp", otpValidator, verifySignupOtp);
router.post("/login", loginValidator, login);
router.post("/verify-login-otp", otpValidator, verifyLoginOtp);
router.post("/google", googleLogin);

export default router;
