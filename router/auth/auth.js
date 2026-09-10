import express from "express"
import {
    loginController,
    signUpController,

} from "../../controllers/auth/auth.js"
const router = express.Router();
 
router.post("/login", loginController);
router.post("/sign-up", signUpController);
 
export default router;