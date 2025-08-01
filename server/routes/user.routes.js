import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes
router.route("/api/users")
  .post(userCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list); // Only admin can list all users

// Routes requiring authentication and authorization
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.remove);

// Preload user by ID
router.param("userId", userCtrl.userByID);

export default router;
