import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  auth(USER_ROLE.Admin),
  validateRequest(UserValidation.ZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
