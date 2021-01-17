import express from "express";
import index from "../controllers";
import auth from "../controllers/auth";
import dashboard from "../controllers/dashboard";

const getRoutes = () => {
  const router = new express.Router();
  router.use(express.json());

  // GET request for Index page
  router.get("/", index.index);

  // GET request for Dashboard page
  router.get("/dashboard", dashboard.dashboard);

  // GET request to signing a user
  router.get("/auth/signin", auth.getSignIn);

  // GET request to check if a user is logged in
  router.get("/auth/current-session", auth.currentSession);

  // GET auth callback
  router.get("/auth/callback", auth.getCallback);

  // GET request to signout currently logged in user
  router.get("/auth/signout", auth.getSignOut);
  return router;
};

export default getRoutes;
