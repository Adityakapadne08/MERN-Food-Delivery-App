import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();
//api/my/user
router.get("/", jwtCheck, jwtParse,MyUserController.getCurrentUser)
//api/my/user
//if we get a req to a backened and a post reqst this handler gets called and pass the rqst on  MyUserController.createCurrentUser
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

export default router;
