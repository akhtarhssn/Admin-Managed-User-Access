import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthZodValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthZodValidation.LoginValidationSchema),
  AuthControllers.loginUser
);
export const AuthRoutes = router;
